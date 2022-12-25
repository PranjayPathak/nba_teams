
import Pagination from 'react-bootstrap/Pagination';


function TablePagination({ total, current, onPageChange }) {

  // let active = 1;
  let items = [];

  // if (current > 1) {
  // items.push(<Pagination.Prev key='prev' disabled={current <= 1} onClick={() => {
  //   onPageChange(current - 1)
  // }} />)
  // }
  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item key={page} active={page === current} onClick={() => {
        onPageChange(page)
      }}>
        {page}
      </Pagination.Item>,
    );
  }
  // if (current < total) {
  //   items.push(<Pagination.Next key='next' onClick={() => {
  //     onPageChange(current + 1)
  //   }} />)
  // }

  return (
    <Pagination>
      <Pagination.Prev key='prev' disabled={current <= 1} onClick={() => {
        onPageChange(current - 1)
      }} />
      {items}
      <Pagination.Next key='next' disabled={current == total} onClick={() => {
      onPageChange(current + 1)
    }} />
    </Pagination>

  )
}

export default TablePagination