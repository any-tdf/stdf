<!-- Divider Demo -->
<script>
    import { Divider } from '../../../../packages/stdf/components';
</script>

<div class="flex flex-col space-y-8 py-8 text-left">
    <div>
        <div class="p-4 font-bold">Different length</div>
        <Divider />
        <Divider px="4" />
        <Divider px="8" />
        <Divider px="16" />
        <Divider px="36" />
    </div>
    <div>
        <div class="p-4 font-bold">Include text</div>
        <Divider text="Zheng Plan" />
        <Divider px="4" text="Red bank base" />
    </div>
    <div>
        <div class="p-4 font-bold">Different heights</div>
        <div class="px-4 text-sm">start</div>
        <Divider py="0" />
        <div class="px-4 text-sm">Height is 0</div>
        <Divider />
        <div class="px-4 text-sm">Height is 4</div>
        <Divider py="8" />
        <div class="px-4 text-sm">Height is 8</div>
    </div>

    <div>
        <div class="p-4 font-bold">Text location</div>
        <Divider text="Left" align="left" />
        <Divider text="Center" />
        <Divider text="Right" align="right" />
    </div>
    <div>
        <div class="p-4 font-bold">Line style</div>
        <Divider text="solid line" />
        <Divider line="dashed" text="Dashed line" />
        <Divider line="dotted" text="Dotted line" />
    </div>
    <div>
        <div class="p-4 font-bold">Custom color</div>
        <Divider injClass="border-blue dark:border-yellow" />
        <Divider text="Custom line" injClass="border-[red] dark:border-[green]" />
        <Divider text="Custom text" injClass="text-[red]" />
        <Divider text="Custom lines and text" injClass="border-[red] text-[blue] dark:text-[yellow]" />
        <Divider line="dashed" text="Custom dotted line" injClass="border-[#FF5722]" />
    </div>
    <div class="px-4">
        <div class="py-4 font-bold">Vertical segmentation line</div>
        <div class="text-sm">
            Three -day volley<Divider layout="v" />Three -day Lianzhu<Divider layout="v" />Person computer
        </div>
    </div>
    <div>
        <div class="p-4 font-bold">Different thickness</div>
        <Divider />
        <Divider weight="2" />
        <Divider weight="4" />
        <div class="px-4 text-sm">
            Sword<Divider layout="v" />Three -day volley<Divider layout="v" weight="2" />Three -day Lianzhu<Divider layout="v" weight="4" />Person computer
        </div>
    </div>
    <div class="px-4">
        <div class="py-4 font-bold">Custom vertical division line</div>
        <div class="text-sm">
            Increase
            <Divider layout="v" mx="4" />
            customize
            <Divider layout="v" mx="4" injClass="border-[red] dark:border-[green]" />
            color
            <Divider line="dashed" layout="v" mx="4" injClass="border-[red] dark:border-[green]" />
            Line style
        </div>
    </div>
</div>
