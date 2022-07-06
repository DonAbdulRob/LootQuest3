# High window count test code for PlayPage.tsx:

let c1 = 0;

for (let i = 0; i < 100; i++) {
    windows.push({
    title: "Equipment" + c1++,
    contentElement: <Equipment { ...{ fighter: player, setFighter: setPlayer }}/>
    });
}

# PlayPage Snippets

<FloatingWindow { ...{title: "Inventory", contentElement: <Inventory { ...{ fighter: player, setFighter: setPlayer }}/>, top: 5, left: 5}} />

<MainButton text="Test" callBack={() => { setPlayer(p => enemy); }}></MainButton>

# Prettier command:

prettier --write .

# Traits code


<h1>Traits - 0/2</h1>
<div>
    <div>
        <h3>
            Strong: Gain +1 strength per level.
            <button onClick={() => {}}>Pick</button>
        </h3>
    </div>
    <div>
        <h3>
            Rich: Monsters carry +1 gold coin per level.
            <button onClick={() => {}}>Pick</button>
        </h3>
    </div>
    <div>
        <h3>
            Smart: Monsters grant +1 experience per level.
            <button onClick={() => {}}>Pick</button>
        </h3>
    </div>
    <div>
        <h3>
            Evasive: +10% bonus chance to successfully flee combat.
            <button onClick={() => {}}>Pick</button>
        </h3>
    </div>
</div>

# Colors:

https://coolors.co/211717-736060-ab7979-ed4c4c-f7e1e1

# Gradients:

https://cssgradient.io/

# Icons:

Docs:
https://dev.materialdesignicons.com/getting-started/react

Icon List (various displays):
https://materialdesignicons.com/
https://dev.materialdesignicons.com/icons
https://pictogrammers.github.io/@mdi/font/6.5.95/
