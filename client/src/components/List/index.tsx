import React from 'react'

interface ListProps {
  listItems: [any];
}

export const List: React.FC<ListProps> = ({listItems}) => {
    return (
      <ul>
        {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    );
}
