import cx from 'classnames';
import { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionProps = {
  key: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHightLighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHightLighted = false,
  children
}: QuestionProps){
  return (
    <div className={cx('question',
      { answered: isAnswered},
      { highlighted: isHightLighted && !isAnswered}
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}