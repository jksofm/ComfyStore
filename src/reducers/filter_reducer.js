import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      // console.log("hi",action.payload)
      let maxPrice = action.payload
        .map((p) => {
          return p.price;
        })
        .sort((a, b) => a - b)[0];

      let minPrice = action.payload
        .map((p) => {
          return p.price;
        })
        .sort((a, b) => b - a)[0];

      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, min_price: maxPrice, max_price: minPrice },

        //Chúng ta rải spread operater vào cả hai bởi vì ta chỉ muốn lấy giá trị của products chứ không tham chiếu đến products
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case SORT_PRODUCTS:
      const { filteredProducts } = state;

      let tempProducts = [...filteredProducts];

      if (action.payload.value === "price-lowest") {
        tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (action.payload.value === "price-highest") {
        tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (action.payload.value === "name-a") {
        tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (action.payload.value === "name-z") {
        tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filteredProducts: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS:
      const { allProducts } = state;
      let tempArr = [...allProducts];
      const { company, search, category, color, price, shipping } =
        state.filters;
      
      if (search) {
        tempArr = tempArr.filter((item, index) => {
          return item.name.toLowerCase().startsWith(search);
        });
      }
      if (category !== "all") {
        tempArr = tempArr.filter((item, index) => {
          return item.category === category;
        });
      }
      if (company !== "all") {
        tempArr = tempArr.filter((item, index) => {
          return item.company === company;
        });
      }
      if (color !== "all") {
        tempArr = tempArr.filter((item, index) => {
          return item.colors.includes(color); 
        });
      }
      tempArr = tempArr.filter((item, index) => {
        return item.price >= price
      })
      if(shipping){
        tempArr = tempArr.filter((item, index) => {
          return item.shipping===true;
        });
      }
      

      return { ...state, filteredProducts: tempArr };
   //Khi ta thực hiên filters vì để có nhiều filters cùng lúc nên ta phải đặt ra UPDATE_FILTERS để cập nhận giá trị của các filter, rồi từ các giá trị đó t mới dispatch action để Filer products , nếu không làm vậy thì sẽ không filters cùng lúc nhiều cái được . Đối với sort bởi vì bản chân chỉ là thay đổi thứ tự trong products chứ không thay đổi products nên t không cần giữ lại giá trị cũ nên không cần đặt ra UPDATE_SORT
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: "",
          company: "all",
          category: "all",
          color: "all",

          price: state.filters.min_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
