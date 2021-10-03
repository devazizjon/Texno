function toCurrency (node) { 
    node.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'usd',
        style:'currency'
    }).format(node.textContent)
 }
const $card = document.querySelector('#card');
document.querySelectorAll('.price').forEach(v=> toCurrency(v))
if($card){
    $card.addEventListener('click', event =>{ 
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
           
            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(data => data.json())
            .then(card =>{
                if(card.cars.length){
                    const html = card.cars.map(c => {
                        return`
                        <tr>
                        <td>${c.title}</td>
                        <td>${c.count}</td>
                        <td>
                            <button class="btn btn-small js-remove" data-id="${c.id}">Delate</button>
                        </td>
                    </tr>
                    `
                    })

                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').innerHTML = card.price;
                    $card.querySelectorAll('.price').forEach(c =>{
                        toCurrency(c)
                    })

                }else{
                    $card.innerHTML = '<p>Card is empty</p>'
                }
            })
        }
    })
}