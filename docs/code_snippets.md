# High window count test code for PlayPage.tsx:

var c1 = 0;

for (var i = 0; i < 100; i++) {
    windows.push({
        title: "Equipment" + c1++,
        contentElement: <Equipment { ...{ fighter: player, setFighter: setPlayer }}/>
    });
}

