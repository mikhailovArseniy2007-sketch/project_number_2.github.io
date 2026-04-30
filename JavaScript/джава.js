let Iphone = [
    {model:"17 Pro Max", price:186000, category:"Flagman", nalichie:"Yes"},
    {model:"17 Pro", price:143000, category:"Flagman", nalichie:"Yes"},
    {model:"17", price:110000, category:"Defult", nalichie:"Yes"},
    {model:"16 Pro Max", price:123000, category:"Flagman", nalichie:"No"},
    {model:"16 Pro", price:105000, category:"Flagman", nalichie:"Yes"},
    {model:"16", price:91000, category:"Defult", nalichie:"No"},
    {model:"15", price:76000, category:"Defult", nalichie:"Yes"}
]

const evens = Iphone
.filter(element => element.price < 100000)
.map(element => `Iphone ${element.model} (цена: ${element.price})`)
.join(', ')
document.getElementById('1').textContent = `В наличие дешевле 100000: ${evens}`

const nal = Iphone
.filter(item => item.nalichie === 'Yes')
.map(item => `Iphone ${item.model} (цена: ${item.price})`)
.join('<br>')
const two = document.querySelector('.two-p')
two.innerHTML = `В наличие есть:<br>${nal}`
