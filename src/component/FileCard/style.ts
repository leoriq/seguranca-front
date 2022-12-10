import styled from 'styled-components'

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const TitlePage = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  @media (max-width: 337px) {
    font-size: 1.5rem;
  }
  @media (max-width: 279px) {
    font-size: 1.2rem;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`
