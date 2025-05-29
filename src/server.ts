import expApp from "./app"
const PORT = process.env.PORT
expApp.listen(PORT, () => {
    console.log("Servidor iniciado en el puerto: ", PORT)
})