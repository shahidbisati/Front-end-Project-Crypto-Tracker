const form = document.querySelector('#searchForm');
const result = document.querySelector('#tableRes');

var update;

form.addEventListener('submit',(e)=>{
    
   e.preventDefault();
   if(update){
    clearTimeout(update);
   }

   const ctype = form.elements.coinType.value;

   fetchPrice(ctype);
});


const fetchPrice = async(ctype)=>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    const price = r.data.coin.price;
    const base = r.data.coin.name;
    const curr = 'USD';
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const marcap = r.data.coin.marketCap;
    const sup = r.data.coin.totalSupply;




    result.innerHTML = `<tr style="background-color:rgb(24,23,85); color: rgb(255, 255, 255); font-weight: 700;">
<td>Property</td>
<td>Value</td>
</tr>
<tr>
<td>
   ${base}
</td>
<td>
    ${price} ${curr}
</td>
</tr>
<tr>
<td>
    Volume
</td>
<td>
    ${volume}
</td>
</tr>  <tr>
<td>
     MarketCap
</td>
<td>
     ${marcap}
</td>
</tr>  <tr>
<td>
      Change
</td>
<td>
     ${change}
</td>
</tr>  <tr>
<td>
     Total Supply
</td>
<td>
      ${sup}
</td>
</tr>
`
   update = setTimeout(()=>fetchPrice(ctype),10000);
}

