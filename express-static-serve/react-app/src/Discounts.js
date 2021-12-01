import Axios from "axios";
import Home from "./Home";
import { useState, updateState } from "react";

export default function applySales(shopList) {
    let temp_list = shopList;
    for (let i = 0; i < shopList.length; i++) {
        let saleItem = null;
            Axios.get("http://localhost:3001/checkSale", { params: { name: shopList[i].Name } })
                .then((response) => {
                    saleItem = response.data;
            if (saleItem) {;
                if (saleItem.length > 0) {
                 //   alert("2"+i + JSON.stringify(saleItem[0]));
                    let quantity = shopList[i].Quantity;
                    let price = quantity * saleItem[0]["base_price"];
                    let q = Math.floor(shopList[i].Quantity / saleItem[0]["quantity"]); // # of times to apply discount
                   // let temp_list = shopList;
                    temp_list[i].Price = price - (q * saleItem[0]["base_price"]) + (q * saleItem[0]["discount_price"]); //apply discount
                   // alert("3"+temp_list[i].Price + temp_list);
                }
                    }
                })
    }
  //  alert("4" + temp_list[0].Price);
    return temp_list;
}