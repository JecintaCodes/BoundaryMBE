import express,{Application, Request,Response} from "express"
import cors from "cors"
import adminRouter from "./router/adminRouter"
import userRouter from "./router/userRouter"
import buyerRouter from "./router/buyerRouter"
import storeRouter from "./router/storeRouter"
import helmet from "helmet"
import morgan from "morgan"
import orderRouter from "./router/orderRouter"

export const mainApp = (app:Application )=>{
    app.use(cors())
    app.use(express.json())

    app.use(morgan("dev"))
    app.use(helmet())

    app.use("/api/v1",adminRouter)
    app.use("/api/v1",userRouter)
    app.use("/api/v1",buyerRouter)
    app.use("/api/v1",storeRouter)
    app.use("/api/v1",orderRouter)

    app.get("/",(req:Request,res:Response)=>{
        try {
            return res.status(200).json({
                message:"Api live .............."
            })
        } catch (error) {
            return res.status(404).json({
                message:"server error",
                data:error
            })
        }
    })
} 