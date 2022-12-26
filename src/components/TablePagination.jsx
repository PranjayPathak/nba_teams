
import Pagination from 'react-bootstrap/Pagination';


function TablePagination({ total, current, onPageChange }) {
 
  let items = []; // Page Links
   
  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item key={page} active={page === current} onClick={() => {
        onPageChange(page)
      }}>
        {page}
      </Pagination.Item>,
    );
  } 

  return (
    <Pagination className='table-pagination' >
      <Pagination.Prev key='prev' disabled={current <= 1} onClick={() => {
        onPageChange(current - 1)
      }} />
      {items}
      <Pagination.Next key='next' disabled={current === total} onClick={() => {
      onPageChange(current + 1)
    }} />
    </Pagination>

  )
}

export default TablePagination