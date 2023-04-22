export function init() {
    const selectTab = document.querySelector('.select-tab')
    const select = document.querySelector('.select')
    const selected = document.querySelector('.selected')
    const selectedItem = document.querySelector('.option.active').querySelector('p')
    const items = document.querySelectorAll('.option')
    
    selectTab.addEventListener('click',() => {
        if(select.classList.contains('active')){
            select.classList.remove('active')
        }else{
            select.classList.add('active')
        }
    })

    items.forEach(el => {
        el.addEventListener('click', () => {
            items.forEach(all => {
                if (all.classList.contains('active')){
                    all.classList.remove('active')
                }
            })
            selected.innerHTML = el.querySelector('p').innerHTML
            el.classList.add('active')
        })
    })
}