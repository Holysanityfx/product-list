 import { useState } from "react";

 import Waffle from "./assets/images/image-waffle-desktop.jpg";
 import Vanilla from "./assets/images/image-creme-brulee-desktop.jpg";
 import Cart from "./assets/images/icon-add-to-cart.svg";
 import Macaron from "./assets/images/image-macaron-desktop.jpg";
 import Tita from "./assets/images/image-tiramisu-desktop.jpg";
 import Bakl from "./assets/images/image-baklava-desktop.jpg";
 import Lemon from "./assets/images/image-meringue-desktop.jpg";
 import Red from "./assets/images/image-cake-desktop.jpg";
 import Salted from "./assets/images/image-brownie-desktop.jpg";
 import Panna from "./assets/images/image-panna-cotta-desktop.jpg";
 import Empty from "./assets/images/illustration-empty-cart.svg";

 import Increase from "./assets/images/icon-increment-quantity.svg";
 import Decrease from "./assets/images/icon-decrement-quantity.svg";
 import Remove from "./assets/images/icon-remove-item.svg";
 import Carbon from "./assets/images/icon-carbon-neutral.svg";

 const products = [
   {
     id: 1,
     name: "Waffle",
     desc: "Waffle with Berries",
     price: 6.5,
     img: Waffle,
   },
   {
     id: 2,
     name: "Creme Brulee",
     desc: "Vanilla Bean Creme Brulee",
     price: 7.0,
     img: Vanilla,
   },
   {
     id: 3,
     name: "Macaron",
     desc: "Macaron Mix of Five",
     price: 8.0,
     img: Macaron,
   },
   { id: 4, name: "Tiramisu", desc: "Classic Tiramisu", price: 5.5, img: Tita },
   { id: 5, name: "Baklava", desc: "Pistachio Baklava", price: 4.0, img: Bakl },
   { id: 6, name: "Pie", desc: "Lemon Meringue Pie", price: 5.0, img: Lemon },
   { id: 7, name: "Cake", desc: "Red Velvet Cake", price: 4.5, img: Red },
   {
     id: 8,
     name: "Brownie",
     desc: "Salted Caramel Brownie",
     price: 5.5,
     img: Salted,
   },
   {
     id: 9,
     name: "Panna Cotta",
     desc: "Vanilla Panna Cotta",
     price: 6.5,
     img: Panna,
   },
 ];

 function App() {
   const [cart, setCart] = useState([]);
   const [showModal, setShowModal] = useState(false);

   const addToCart = (product) => {
     setCart((prev) => {
       const exist = prev.find((i) => i.id === product.id);
       if (exist) {
         return prev.map((i) =>
           i.id === product.id ? { ...i, qty: i.qty + 1 } : i
         );
       }
       return [...prev, { ...product, qty: 1 }];
     });
   };

   const increaseQty = (id) => {
     setCart((prev) =>
       prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
     );
   };

   const decreaseQty = (id) => {
     setCart((prev) =>
       prev
         .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
         .filter((i) => i.qty > 0)
     );
   };

   const removeItem = (id) => {
     setCart((prev) => prev.filter((i) => i.id !== id));
   };

   const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
   const totalCost = cart
     .reduce((sum, i) => sum + i.qty * i.price, 0)
     .toFixed(2);

   const confirmOrder = () => setShowModal(true);
   const resetOrder = () => {
     setCart([]);
     setShowModal(false);
   };

   return (
     <div className="min-h-screen bg-amber-50 p-4 md:px-20 md:py-16">
       {/* TITLE */}
       <h1 className="font-bold mb-5 text-3xl">Desserts</h1>

       <div className="flex flex-col lg:flex-row gap-10">
         {/* PRODUCT GRID */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
           {products.map((p) => {
             const inCart = cart.find((i) => i.id === p.id);

             return (
               <div key={p.id} className="relative">
                 <div
                   className="w-full h-56 sm:h-60 bg-cover bg-center rounded-lg"
                   style={{ backgroundImage: `url(${p.img})` }}
                 ></div>

                 {/* ADD TO CART / CONTROLLER */}
                 {inCart ? (
                   <div className="flex items-center justify-between mb-3 gap-3 -mt-6 mx-auto w-36 sm:w-40 bg-amber-600 text-white p-3 rounded-3xl shadow-md">
                     <button onClick={() => decreaseQty(p.id)}>
                       <img
                         src={Decrease}
                         className="h-1 sm:h-5"
                         alt="decrease"
                       />
                     </button>

                     <span className="font-bold text-lg">{inCart.qty}</span>

                     <button onClick={() => increaseQty(p.id)}>
                       <img
                         src={Increase}
                         className="h-4 sm:h-5"
                         alt="increase"
                       />
                     </button>
                   </div>
                 ) : (
                   <button
                     onClick={() => addToCart(p)}
                     className="flex items-center justify-center mb-3 gap-2 -mt-6 mx-auto w-36 sm:w-40 border border-amber-400 bg-white hover:bg-amber-100 p-3 text-xs font-bold rounded-3xl shadow-md transition-all"
                   >
                     <img src={Cart} className="h-4" alt="cart" />
                     <span>Add to Cart</span>
                   </button>
                 )}

                 <p className="text-sm text-amber-800">{p.name}</p>
                 <p className="text-sm font-bold">{p.desc}</p>
                 <p className="text-yellow-600 font-bold">
                   ${p.price.toFixed(2)}
                 </p>
               </div>
             );
           })}
         </div>

         {/* CART */}
         <div className="bg-white w-full lg:w-1/3 p-5 rounded-xl shadow-sm h-fit">
           <h2 className="font-bold text-amber-800 text-3xl mb-5">
             Your Cart ({totalItems})
           </h2>

           {cart.length === 0 ? (
             <div className="text-center">
               <img src={Empty} className="mx-auto w-40" />
               <p className="text-yellow-900 font-bold mt-5">
                 Your added items will appear here
               </p>
             </div>
           ) : (
             <>
               {cart.map((item) => (
                 <div
                   key={item.id}
                   className="flex justify-between items-center border-b pb-3 mb-3"
                 >
                   <div>
                     <p className="font-bold text-sm">{item.desc}</p>
                     <div className="flex gap-3 text-sm">
                       <span className="text-amber-700">{item.qty}x</span>
                       <span className="text-amber-500">
                         @ ${item.price.toFixed(2)}
                       </span>
                       <span className="font-bold">
                         ${(item.qty * item.price).toFixed(2)}
                       </span>
                     </div>
                   </div>

                   <div className="flex items-center gap-2">
                     <button onClick={() => decreaseQty(item.id)}>
                       <img src={Decrease} className="h-4 sm:h-5" />
                     </button>
                     <button onClick={() => increaseQty(item.id)}>
                       <img src={Increase} className="h-4 sm:h-5" />
                     </button>
                     <button onClick={() => removeItem(item.id)}>
                       <img src={Remove} className="h-5 sm:h-6" />
                     </button>
                   </div>
                 </div>
               ))}

               <div className="flex justify-between mt-5 text-lg font-bold">
                 <p>Order Total</p>
                 <p>${totalCost}</p>
               </div>

               <div className="flex items-center gap-2 bg-amber-100 p-3 rounded-lg mt-4 text-sm">
                 <img src={Carbon} className="h-5" />
                 <p>
                   This is a{" "}
                   <span className="text-green-700 font-bold">
                     carbon-neutral
                   </span>{" "}
                   delivery
                 </p>
               </div>

               <button
                 onClick={confirmOrder}
                 className="w-full mt-4 bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-bold"
               >
                 Confirm Order
               </button>
             </>
           )}
         </div>
       </div>

       {/* ORDER CONFIRMATION MODAL */}
       {showModal && (
         <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
           <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-md shadow-xl">
             <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3">
               Order Confirmed 🎉
             </h2>

             <p className="text-amber-600 mb-4">We hope you enjoy your food!</p>

             <div className="bg-amber-100 p-4 rounded-lg max-h-80 overflow-y-auto">
               {cart.map((item) => (
                 <div
                   key={item.id}
                   className="flex justify-between items-center border-b py-3"
                 >
                   <div>
                     <p className="font-bold text-sm">{item.desc}</p>
                     <p className="text-sm">
                       {item.qty} × ${item.price.toFixed(2)}
                     </p>
                   </div>
                   <p className="font-bold text-sm">
                     ${(item.qty * item.price).toFixed(2)}
                   </p>
                 </div>
               ))}

               <div className="flex justify-between pt-3 text-lg font-bold">
                 <p>Order Total</p>
                 <p>${totalCost}</p>
               </div>
             </div>

             <button
               onClick={resetOrder}
               className="w-full mt-6 bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-bold"
             >
               Start New Order
             </button>
           </div>
         </div>
       )}
     </div>
   );
 }

 export default App;
