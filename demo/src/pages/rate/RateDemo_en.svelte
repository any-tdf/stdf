<!-- Rate Demo -->
<script>
    import {Rate, Icon} from '../../../../components';

    let value = 2.5;
    const getValueFun = e => {
        value = e.detail;
    };
</script>
<div class="mx-4 mt-8 font-bold text-lg">Basic usage</div>
<div class="p-4">
    <Rate/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Set initial score</div>
<div class="p-4">
    <Rate value={1}/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Zero points allowed</div>
<div class="p-4">
    <Rate zero/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Custom score</div>
<div class="p-4">
    <Rate total={8}/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Set unselected transparency</div>
<div class="p-4">
    <Rate opacity={0.8}/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Allow semi-selection</div>
<div class="p-4">
    <Rate half/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Vertical semi-selection</div>
<div class="p-4">
    <Rate half vertical/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Half option allows zero points</div>
<div class="p-4">
    <Rate half zero/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Increase spacing</div>
<div class="p-4">
    <Rate space="8"/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">disable</div>
<div class="p-4">
    <Rate disabled/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Read only</div>
<div class="p-4">
    <Rate readonly/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Different size</div>
<div class="p-4">
    <Rate width={20} height={20}/>
</div>
<div class="p-4">
    <Rate width={28} height={28}/>
</div>
<div class="p-4">
    <Rate width={36} height={36}/>
</div>
<div class="mx-4 mt-8 font-bold text-lg">customize</div>
<div class="p-4">
    <Rate custom opacity={0.6}>
        <Icon name="ri-star-fill" injClass="text-[#f5b53f]"/>
    </Rate>
</div>
<div class="p-4">
    <Rate custom>
        <Icon name="ri-heart-3-fill" injClass="text-[red]"/>
    </Rate>
</div>
<div class="p-4">
    <Rate half custom>
        <Icon name="ri-heart-3-fill" injClass="text-[red]"/>
    </Rate>
</div>
<div class="p-4">
    <Rate half opacity={0.5} width={30} height={36} custom>
        <div class="text-3xl">👍</div>
    </Rate>
</div>
<div class="p-4">
    <Rate half opacity={0.5} width={30} height={36} vertical custom>
        <div class="text-3xl">🍺</div>
    </Rate>
</div>
<div class="p-4">
    <Rate half opacity={0.5} width={30} height={36} custom>
        <div class="text-3xl text-primary dark:text-dark">M</div>
    </Rate>
</div>
<div class="mx-4 mt-8 font-bold text-lg">Listening event</div>
<div class="p-4">
    <Rate half {value} on:click={getValueFun}/>
    <p class="mt-2">Score:{value} star </p>
</div>

<div class="mx-4 mt-8 font-bold text-lg">All activation ICONS have click animations</div>
<div class="p-4">
    <Rate animation='active'/>
</div>

<div class="mx-4 mt-8 font-bold text-lg">Close click animation</div>
<div class="p-4">
    <Rate animation='none'/>
</div>
