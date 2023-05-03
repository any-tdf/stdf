const fs = require('fs');

fs.readFile('./components/package.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const componentsObj = JSON.parse(data);

    fs.readFile('./package.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const stdfObj = JSON.parse(data);
        stdfObj.version = componentsObj.version;
        fs.writeFile('./package.json', JSON.stringify(stdfObj, '', '\t'), err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('version updated!');
        });
    });
});
