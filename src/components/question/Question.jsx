import './Question.scss'
import cx from 'classnames';




export function Question({
    content,
    author,
    children,
    isAnswered = false,
    ishighlighted = false}) {
    
    const avatar = author.avatar;
    const name = author.name;
  
    

    return(
        <div className={cx(
            'question',
            { answered: isAnswered},
            { highlighted: ishighlighted && !isAnswered},
            )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={avatar} alt={name} />
                    <span>{name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}