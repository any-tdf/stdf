#!/usr/bin/env python3
# coding=utf-8
# __author__ = 'hanli.zyb'
# __date__ = '2021-04-23'

'''Check Package'''

try:
    import os, re, sys, getopt, time, json, logging
    from aliyunsdkcore.client import AcsClient
    from aliyunsdkcore.acs_exception.exceptions import ClientException
    from aliyunsdkcore.acs_exception.exceptions import ServerException
    from aliyunsdkcdn.request.v20180510.RefreshObjectCachesRequest import RefreshObjectCachesRequest
    from aliyunsdkcdn.request.v20180510.PushObjectCacheRequest import PushObjectCacheRequest
    from aliyunsdkcdn.request.v20180510.DescribeRefreshTasksRequest import DescribeRefreshTasksRequest
    from aliyunsdkcdn.request.v20180510.DescribeRefreshQuotaRequest import DescribeRefreshQuotaRequest
except:
    sys.exit("[error] Please pip install aliyun-python-sdk-cdn and aliyun-python-sdk-core and logging，please install now......")
logging.basicConfig(level=logging.DEBUG, filename='./RefreshAndPredload.log')

class Envariable(object):
    LISTS = []
    REGION = 'cn-zhangzhou'
    AK = os.environ.get("ALIYUN_CDN_AK")
    SK = os.environ.get("ALIYUN_CDN_SK")
    FD = None
    CLI = None
    TASK_TYPE = None
    TASK_AREA = None
    TASK_OTYPE = None

    def set_ak(ak):
        Envariable.AK = ak

    def get_ak():
        return Envariable.AK

    def set_sk(sk):
        Envariable.SK = sk

    def get_sk():
        return Envariable.SK

    def set_fd(fd):
        Envariable.FD = fd

    def get_fd():
        return Envariable.FD

    def set_task_type(task_type):
        Envariable.TASK_TYPE = task_type

    def get_task_type():
        return Envariable.TASK_TYPE

    def set_task_area(task_area):
        Envariable.TASK_AREA = task_area

    def get_task_area():
        return Envariable.TASK_AREA

    def set_task_otype(task_otype):
        Envariable.TASK_OTYPE = task_otype

    def get_task_otype():
        return Envariable.TASK_OTYPE

    def set_acs_client():
        Envariable.CLI = AcsClient(Envariable.get_ak(), Envariable.get_sk(), Envariable.REGION)

    def get_acs_client():
        return Envariable.CLI

class InitHandler(object):
    def __init__(self,ak,sk,region):
        try:
            self.client = AcsClient(self,Envariable.get_ak(),Envariable.get_sk(),Envariable.REGION)
        except Exception:
            logging.info("[error]: initial AcsClient failed") and exit(1)

class BaseCheck(object):

    def __init__(self):
        self.invalidurl = ''
        self.lines = 0
        self.urllist = Envariable.get_fd()

    def printQuota(self):

        try:
            if Envariable.get_acs_client():
                client = Envariable.get_acs_client()
            else:
                Envariable.set_acs_client()
                client = Envariable.get_acs_client()
            quotas = DescribeRefreshQuotaRequest()
            quotaResp = json.loads(Envariable.get_acs_client().do_action_with_exception(quotas))
        except Exception as e:
            logging.info("\n[error]: initial AcsClient failed\n") and sys.exit(1)

        if Envariable.TASK_TYPE:
            if Envariable.TASK_TYPE == 'push':
                if self.lines > int(quotaResp['PreloadRemain']):
                    sys.exit("\n[error]：PreloadRemain is not enough {0}".format(quotaResp['PreloadRemain']))
                return True
            if Envariable.TASK_TYPE == 'clear':
                if Envariable.get_task_otype() == 'File' and self.lines > int(quotaResp['UrlRemain']):
                    sys.exit("\n[error]：UrlRemain is not enough {0}".format(quotaResp['UrlRemain']))
                elif Envariable.get_task_otype() == 'Directory' and self.lines > int(quotaResp['DirRemain']):
                    sys.exit("\n[error]：DirRemain is not enough {0}".format(quotaResp['DirRemain']))
                else:
                    return True

    def urlFormat(self):
        with open(self.urllist, "r") as f:
            for line in f.readlines():
                self.lines += 1
                if not re.match(r'^((https)|(http))',line):
                    self.invalidurl = line + '\n' + self.invalidurl
            if self.invalidurl != '':
                sys.exit("\n[error]: URL format is illegal \n{0}".format(self.invalidurl))
            return True

class doTask(object):

    def urlencode_pl(inputs_str):
        len_str = len(inputs_str)
        if str == "" or len_str <= 0:
            return ""
        index_j = 0
        index_i = 0
        result_end = ""
        for index_i in range(0, len_str):
            index_sb = index_i + 1
            chs = inputs_str[index_i:index_sb]
            if (chs >= 'A' and chs <= 'Z') or (chs >= 'a' and chs <= 'z') or (chs >= '0' and chs <= '9') or (
                    chs == ":") or (chs == "/"):
                if result_end == "":
                    result_end = chs
                else:
                    result_end += chs
            elif chs == ' ':
                result_end += '+'
            elif chs == '.' or chs == '-' or chs == '_' or chs == '*':
                result_end += chs
            else:
                result_end = '%s%%%02X' % (result_end, ord(chs))

        return result_end

    def doProd(self):
        gop = 100
        mins = 1
        maxs = gop
        with open(Envariable.get_fd(), "r") as f:
            for line in f.readlines():
                if mins != maxs:
                    line = line.strip("\n") + "\n"
                else:
                    line = line.strip("\n")
                line = line.strip()
                line = doTask.urlencode_pl(line) + "\n"
                Envariable.LISTS.append(line)
                if mins >= maxs:
                    yield Envariable.LISTS
                    mins = maxs
                    maxs = gop + maxs - 1
                else:
                    mins += 1
            if len(Envariable.LISTS) > 0: yield Envariable.LISTS

    def doRefresh(lists):
        try:
            if Envariable.get_acs_client():
                client = Envariable.get_acs_client()
            else:
                Envariable.set_acs_client()
                client = Envariable.get_acs_client()
            if Envariable.get_task_type() == 'clear':
                taskID = 'RefreshTaskId'
                request = RefreshObjectCachesRequest()
                if Envariable.get_task_otype():
                    request.set_ObjectType(Envariable.get_task_otype())
            elif Envariable.get_task_type() == 'push':
                taskID = 'PushTaskId'
                request = PushObjectCacheRequest()
                if Envariable.get_task_area():
                    request.set_Area(Envariable.get_task_area())
            taskreq = DescribeRefreshTasksRequest()
            request.set_accept_format('json')
            request.set_ObjectPath(lists)
            response = json.loads(client.do_action_with_exception(request))
            print(response)
            timeout = 0
            while True:
                count = 0
                taskreq.set_accept_format('json')
                taskreq.set_TaskId(int(response[taskID]))
                taskresp = json.loads(client.do_action_with_exception(taskreq))
                print("[" + response[taskID] + "]" + "is doing... ...")
                for t in taskresp['Tasks']['CDNTask']:
                    if t['Status'] != 'Complete':
                        count += 1
                if count == 0:
                    logging.info("[" + response[taskID] + "]" + "is finish")
                    break
                elif timeout > 5:
                    logging.info("[" + response[taskID] + "]" + "timeout")
                    break
                else:
                    timeout += 1
                    time.sleep(5)
                    continue
        except Exception as e:
            logging.info("\n[error]：%s",e) and sys.exit(1)

class Refresh(object):

    def main(self,argv):
        if len(argv) < 1:
            sys.exit("\n[usage]: " + sys.argv[0] + " -h ")
        try:
            opts, args = getopt.getopt(argv, "hi:k:n:r:t:a:o:")
        except Exception as e:
                sys.exit("\n[usage]: " + sys.argv[0] + " -h ")

        for opt, arg in opts:
            if opt == '-h':
                self.helps()
                sys.exit()
            # elif opt == '-i':
            #     Envariable.set_ak(arg)
            # elif opt == '-k':
            #     Envariable.set_sk(arg)
            elif opt == '-r':
                Envariable.set_fd(arg)
            elif opt == '-t':
                Envariable.set_task_type(arg)
            elif opt == '-a':
                Envariable.set_task_area(arg)
            elif opt == '-o':
                Envariable.set_task_otype(arg)
            elif opt == '-q':
                Envariable.set_task_id(arg)
            else:
                sys.exit("\n[usage]: " + sys.argv[0] + " -h \n")

        try:
            if not (Envariable.get_ak() and Envariable.get_sk() and Envariable.get_fd() and Envariable.get_task_type()):
                sys.exit("\n[error]: Must be by parameter '-i', '-k', '-r', '-t'\n")

            if not (Envariable.get_task_type() in ("push", "clear")):
                sys.exit("\n[error]: taskType Error, '-t' option in 'push' or 'clear'\n")

            if Envariable.get_task_area() and Envariable.get_task_otype():
                sys.exit("\n[error]: -a and -o cannot exist at same time\n")

            if Envariable.get_task_area():
                if not Envariable.get_task_area() in ("domestic","overseas"):
                    sys.exit("\n[error]: Area value Error, '-a' option in 'domestic' or 'overseas'\n")

            if Envariable.get_task_otype():
                if not Envariable.get_task_otype() in ("File", "Directory"):
                    sys.exit("\n[error]: ObjectType value Error, '-a' options in 'File' or 'Directory'\n")
                if Envariable.get_task_type() == 'push':
                    sys.exit("\n[error]: -t must be clear and 'push' -a use together\n")
        except Exception as e:
            logging.info("\n[error]: Parameter {0} error\n".format(str(e))) and sys.exit(1)

        handler = BaseCheck()
        if  handler.urlFormat() and handler.printQuota():
            for g in doTask.doProd(Envariable.get_fd()):
                Envariable.LISTS = []
                doTask.doRefresh(''.join(g))
                time.sleep(1)

    def helps(self):
        print("\nscript options explain: \
                    \n\t -i <AccessKey>                  访问阿里云凭证，访问控制台上可以获得； \
                    \n\t -k <AccessKeySecret>            访问阿里云密钥，访问控制台上可以获得； \
                    \n\t -r <filename>                   filename指“文件所在的路径+文件名称”，自动化脚本运行后将会读取文件内记录的URL；文件内的URL记录方式为每行一条URL，有特殊字符先做URLencode，以http或https开头； \
                    \n\t -t <taskType>                   任务类型，clear：刷新，push：预热； \
                    \n\t -a [String,<domestic|overseas>  可选项，预热范围，不传默认是全球；\
                    \n\t    domestic                     仅中国内地； \
                    \n\t    overseas                     全球（不包含中国内地）； \
                    \n\t -o [String,<File|Directory>]    可选项，刷新的类型； \
                    \n\t    File                         文件刷新（默认值）； \
                    \n\t    Directory                    目录刷新")

#TODO
if __name__ == '__main__':
    fun = Refresh()
    fun.main(sys.argv[1:])