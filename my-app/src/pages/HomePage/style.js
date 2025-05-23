// import styled from "styled-components";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

// export const WrapperTypeProduct = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 24px;
//     justify-content: flex-start;
//    // border-bottom: 1px solid red;
//     //height: 44px;

// `

// export const WrapperButtonMore = styled(ButtonComponent)`
//     &:hover{
//         color: #fff;
//         background: rgb(13, 92, 182);
//     }
//     width: 100%;
//     text-align: center;
// `

// export const WrapperProduct = styled.div`
//     display: flex;
//     justify-content: center;
//     margin-top: 20px;
//     gap:15px; 
//     flex-wrap: wrap
// `

// export const WrapperFlash = styled.div`
//     display: flex;
//     justify-content: center;
//     margin-top: 20px;
//     gap:15px; 
//     flex-wrap: wrap;
// `



import styled from 'styled-components';

export const Container = styled.div`
  background-color: #efefef;
  padding: 0 120px;
  width: 100%;
  min-height: 100vh;
  
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const SliderWrapper = styled.div`
  padding-top: 12px;
`;

export const TypeProductSection = styled.div`
  margin-top: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 20px;
    }
  }
`;

export const TypeProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* tương đương gap-4 */
  margin: 2.5rem 0; /* tương đương my-10 */

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr); /* sm:grid-cols-3 */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* lg:grid-cols-4 */
  }
`;

export const ViewMoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
