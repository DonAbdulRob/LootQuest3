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