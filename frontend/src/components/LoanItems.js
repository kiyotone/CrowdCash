const LoanItems=(props) => {
    const amount = props.data.amount
    const date =(props.data.created_at);
    console.log(props.data)
    
    const creaated_date = date.substring(0, 10);

    return(
        <div className="flex gap-5">
            <div>{creaated_date}</div>
            <div>{amount}</div>
            <div>{props.data.weeks} Weeks</div>
        </div>
    )
}

export default LoanItems