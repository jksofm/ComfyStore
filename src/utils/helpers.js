export const formatPrice = (price) => {
return Intl.NumberFormat('en-US',{
    style : "currency",
    currency : 'USD'
}).format(price/100)
    
}

export const getUniqueValues = (data,type) => {
    let unique = data.map((item=> item[type]))
    if(type ==='colors'){
        unique= unique.flat();

      
        return ['all',...new Set(unique)];
    }
    return ['all',...new Set(unique)]
    
}
