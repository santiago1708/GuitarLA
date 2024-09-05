import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
import { useState , useEffect} from "react"


function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : [] //JSON.parce lo convierte a un arreglo
    }

    //State 
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemsE = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemsE < 0 ){
            item.quantity = 1
            setCart([...cart, item])
        }else {
            if(cart[itemsE].quantity >= MAX_ITEMS) return 
            const updateCart = [...cart]
            updateCart[itemsE].quantity++
            setCart(updateCart)
        }
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuanquity(id) {
        const updatedCart = cart.map((item) => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item, 
                    quantity: item.quantity + 1}
            }
            return item
        }) 
        setCart(updatedCart)
    }

    function DecreaseQuanquity(id) {
        const updatedCart = cart.map((item) => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item, 
                    quantity: item.quantity - 1}
            }
            return item
        }) 
        setCart(updatedCart)
    }

    function cleanCart() {
        setCart([])
    }


    return (
    <>
        <Header 
            cart={cart}
            removeFromCart = {removeFromCart}
            increaseQuanquity = {increaseQuanquity}
            DecreaseQuanquity = {DecreaseQuanquity}
            cleanCart = {cleanCart}
        />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar
                    key={guitar.id}
                    guitar = {guitar}
                    setCart = {setCart}
                    addToCart = {addToCart}
                />
            ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
)
}

export default App
