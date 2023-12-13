
import React from "react"

function App() {

// console.log(process.env.REACT_APP_APPWRITE_URL)
console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
<>
<h1 className=' font-semibold text-center text-4xl mt-10 text-green-800'>A MegaProject with appwrite service</h1>
</>
  )
}

export default App
