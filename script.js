document.querySelector(".person-card__timeframes").addEventListener("click", (e) => {
    const target = e.target
    const activeClass = "person-card__timeframe-item_active"

    if (target.classList.contains("person-card__timeframe-item")) {
        e.currentTarget.querySelector("." + activeClass).classList.remove(activeClass)
        target.classList.add(activeClass)
        document.querySelector(".container").dataset.timeframe = target.innerHTML.toLowerCase()
    }

})

async function fetchData() {
    const response = await fetch("/data.json")
    if (response.ok)
        return response.json()
}

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
        .then(cards => {
            const container = document.querySelector(".container");
            let cardsElements = cards.map(({ title, timeframes}) => {
                let timeFrames = ""
                for (let timeframe in timeframes) {
                    let timeFrameName = ""
                    switch (timeframe) {
                        case "daily":
                            timeFrameName = "Day"
                            break;
                        case "weekly":
                            timeFrameName = "Week"
                            break;
                        case "monthly":
                            timeFrameName = "Month"
                        default:
                            break;
                    }
                    timeFrames += `
                        <div class="card__timeframe card__timeframe_${timeframe}">
                            <div class="card__time">${timeframes[timeframe].current}hrs</div>
                            <div class="card__prev-period">Last ${timeFrameName} - ${timeframes[timeframe].previous}hrs</div>
                        </div>
                    `
                }
                return `
                    <article class="card card_${title.toLowerCase().replace(" ", "-")}">
                        <div class="card__content">
                            <div class="card__header">
                                <h3 class="card__title">${title}</h3>
                                <div class="card__menu">
                                    <img src="./images/icon-ellipsis.svg" alt="menu">
                                </div>
                            </div>
                            <div class="card__body">
                                <div class="card__timeframes">
                                    ${timeFrames}
                                </div>
                            </div>
                        </div>
                    </article>
                `
            })
            container.insertAdjacentHTML('beforeEnd', cardsElements.join(''))
        })
        .catch(err => console.log(err))
})