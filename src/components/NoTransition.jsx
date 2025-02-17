import payment from "../assets/paymentImg.jpeg"
const NoTransition = () => {
  return (
    <div className="w-[40%] mx-auto flex flex-col justify-center item-center">
    <img className="h-[40vh] object-cover" src={payment}></img>
    <p className="text-center">No Transaction Found</p>
    </div>
  )
}

export default NoTransition
