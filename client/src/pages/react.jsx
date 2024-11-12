import React, { useEffect, useState } from 'react';
import {Navigate} from "react-router-dom"
import { useAuth } from '../../store/auth';
const BarcodeScanner = () => {

    const [data, setData] = useState("")
    const [items, setItems] = useState("")
    const [amountInput, setAmountInput] = useState(false)
    const [itemDetails, setItemDetails] = useState({})
    const [amount, setAmount] = useState(0)
    const {token, shopid} = useAuth()
    const backapi = "http://localhost:5000"

    const startScanner =async () => {
        const targetElement = document.querySelector('#interactive');
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: targetElement, // Target element
                constraints: {
                    facingMode: "environment" // Use the back camera
                }
            },
            decoder: {
                readers: ["code_128_reader"] // Add other readers as needed
            }
        }, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        // Register the onDetected event
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            console.log(data, "dataaaaa")
            console.log(`Code detected: ${code}`);
            document.getElementById('result').innerText = `Scanned Code: ${code}`;
            
            // Stop scanning after a successful scan
            Quagga.stop();
            setData(code)
        });

    }
    
    useEffect(() => {
        // Initialize Quagga
        

        startScanner();

        

        // Cleanup function to stop Quagga when component unmounts
        // return () => {
        //     Quagga.stop();
        // };
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
        if(data.length > 0)
        {
            const fetchdata = async(res, req) => {
                console.log(data, "inside function")
                const response = await fetch("http://localhost:5000/api/auth/scanproduct", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({data: data})
                })
                const message = await response.json();
                console.log(message)

                if(message.productname != "Scan Again")
                {
                    setItems(message.productname)
                    setAmountInput(true)
                    
                }
            }

            
            fetchdata()
        }
        
    }, [data])

    const handleClick = () => {
        setData("")
        setAmountInput(false)
        setItems("")
        startScanner()
    }

    useEffect(() => {
        console.log(items)
    }, [items])

    useEffect(() => {
        console.log(itemDetails)
        const addToCart = async() => {
            const response = await fetch(`${backapi}/api/auth/addtocart`, {
            
                method: "POST",
                headers: {
                    "Content-Type": `application/json`,
                    Authorization: `Bearer ${token}`,
                    ShopID: shopid
                },
                body: JSON.stringify(itemDetails)
            })
        }

        addToCart()
    }, [itemDetails])

    const handleAdd = async(e) => {
        e.preventDefault()
        console.log("add")
        setItemDetails( {productname: items, quantity: Number(amount)})
        setAmountInput(false)
    }

    const handleAmount = (e) => {
        const {value} = e.target;
        setAmount(value)
    }

    // if(!token)
    //     {
    //       return <Navigate to="/"/>
    //     }

    return (
       <>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <h1>Barcode Scanner</h1>
            <div id="interactive" style={{ width: '600px', height: '400px', border: '1px solid #ccc', marginBottom: '20px' }}></div>
            <div id="result" style={{ marginTop: '20px', fontSize: '1.2em' }}></div>
        </div>
        {amountInput ? 
            <>
                <form onSubmit={handleAdd}  action="">
                    <input onChange={handleAmount} type="number" placeholder='Quantity' name='quantity' />
                    <button type='submit'>Add</button>
                </form>
            </>:
            <></>
        }
        <button onClick={handleClick}>Scan Again</button>
       </>
        
    );
};

export default BarcodeScanner;
