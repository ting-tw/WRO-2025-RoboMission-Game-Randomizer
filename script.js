
var maps = Array.from(document.getElementsByClassName("map"));

function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

function clearClasses(divs, colorList) {
    divs.forEach(div => {
        colorList.forEach(c => div.classList.remove(c));
    });
}

function assignColors(containerId, colors, emptyCount) {
    const divs = Array.from(document.querySelectorAll(`#${containerId} > div`));
    clearClasses(divs, colors);

    const total = divs.length;
    const colorCount = total - emptyCount;

    const selected = shuffle(colors).slice(0, colorCount);

    const tags = selected.concat(Array(emptyCount).fill(null));

    const shuffledTags = shuffle(tags);

    divs.forEach((div, idx) => {
      const tag = shuffledTags[idx];
      if (tag) {
        div.classList.add(tag);
      }
    });
  }

function random() {
    // map_elementary：5 個 div，4 色 + 1 空
    assignColors('map_elementary',
        ['blue', 'yellow', 'red', 'green', 'white'],
        1);

    // map_junior：6 個 div，4 色 + 2 空
    assignColors('map_junior',
        ['green', 'red', 'white', 'yellow'],
        2);

    // map_senior：火箭組裝 4 個 + 酬載 1 個
    const seniorDivs = Array.from(document.querySelectorAll('#map_senior > div'));
    const seniorColors = ['green', 'blue', 'yellow', 'red'];

    clearClasses(seniorDivs, seniorColors);

    // (火箭組裝
    const rocket = shuffle(seniorColors.slice());
    seniorDivs.slice(0, 4).forEach((div, idx) => {
        div.classList.add(rocket[idx]);
    });

    // 酬載
    const payloadDiv = seniorDivs[4];
    const payloadColor = seniorColors[Math.floor(Math.random() * seniorColors.length)];
    payloadDiv.classList.add(payloadColor);
}

function screenshot() {
    htmlToImage.toJpeg(Array.from(document.getElementsByClassName("map")).find(ele => ele.classList.contains("select")), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'Map.jpeg';
            link.href = dataUrl;
            link.click();
        });

}

function changeCategory(value) {
    maps.forEach((map, index) => {
        (index == parseInt(value)) ? map.classList.add("select") : map.classList.remove("select");
    })
}

random()