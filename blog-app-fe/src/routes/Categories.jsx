import { Container } from "react-bootstrap"
import CategoryList from "../components/CategoryList"

function Categories({categoryList}) {
  return (
    <>
     
      <CategoryList categoryList={categoryList} />
      </>
    
  )
}

export default Categories