export const Notify = ({notificationError}) => {
    if(!notificationError) return null
    return <div className="error">{notificationError}</div>
}   
