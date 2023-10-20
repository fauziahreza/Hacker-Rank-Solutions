import React from 'react';

function Articles() {
  const articles = [
    {
      title: 'Alphabets earning',
      upvotes: 22,
      date: '2019-11-23'
    },
    {
      title: 'Artificial Mountains',
      upvotes: 3,
      date: '2019-11-21'
    },
    {
      title: 'The Emu War',
      upvotes: 24,
      date: '2022-01-03'
    },
    {
      title: 'Simple Text Editor',
      upvotes: 6,
      date: '2019-11-21'
    },
    {
      title: 'A Message to Our Customers',
      upvotes: 9,
      date: '2022-11-21'
    },
    {
      title: 'Scaling to 100k Users',
      upvotes: 12,
      date: '2021-01-21'
    },
    {
      title: 'Whats SAP',
      upvotes: 13,
      date: '2020-09-21'
    }
  ]

    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Upvotes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                  {articles.map((article, index) =>(
                    <tr data-testid="article" key={index}>
                      <td data-testid="article-title">{article.title}</td>
                      <td data-testid="article-upvotes">{article.upvotes}</td>
                      <td data-testid="article-date">{article.date}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );

}

export default Articles;
