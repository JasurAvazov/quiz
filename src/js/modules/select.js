export function init() {
    const selectTab = document.querySelectorAll('.select-tab')
    const select = document.querySelectorAll('.select')
    const selected = document.querySelector('.selected')
    const selectedItem = document.querySelector('.option.active').querySelector('p')
    const items = document.querySelectorAll('.option')
    
    selectTab.forEach(el => {
        el.addEventListener('click',() => {
            if (el.parentElement.classList.contains('active')) {
                el.parentElement.classList.remove('active')
            }else{
                el.parentElement.classList.add('active')
            }
        })
    });
    

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