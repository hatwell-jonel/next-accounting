import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const LoadingIcon = ({

}) => {
// https://mhnpd.github.io/react-loader-spinner/docs/components/mutating-dots
return (
    <MutatingDots
        visible={true}
        height="50"
        width="50"
        color="#fffff"
        secondaryColor="#00000"
        radius="10"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
  )
}

export default LoadingIcon