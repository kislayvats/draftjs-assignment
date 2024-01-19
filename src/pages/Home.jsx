import React from 'react'
import DraftEditor from '../components/editor'

export default function Home() {

  const HelperJSX=({t1,t2})=>{
    return(
<h4>Press <span className='identifier'>{t1}</span> for making text <span className='identifier'>{t2}</span></h4> 
    )
  }


    // main jsx
  return (
    <div className='flexCenter pt2' style={{flexDirection:"column"}}>
  
 {/* editor component */}
    <DraftEditor />
    {/* README */}
    <div className='flexCenter' style={{gap:10}}>
<HelperJSX t1="#" t2="H1" />||
<HelperJSX t1="*" t2="Bold" />||
<HelperJSX t1="@" t2="Red" />||
<HelperJSX t1="$" t2="Underline" />
    </div>
    </div>
  )
}  
