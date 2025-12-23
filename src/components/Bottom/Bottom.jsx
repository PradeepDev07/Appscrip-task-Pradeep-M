import  style from './bottom.module.css'

const Bottom = () => {
  return (
   <footer className={style['bottom-footer']}>
    <div  className={style['footer-container']}>
        <div className='pt gap'>
            <h1>BE THE FIRST ONE </h1>
            <p>Sign up for updates from mettes muse.</p>
            <div>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
            </div>
        </div>
        <div className='pt'>
            <h1>CONTACT US</h1>
            <p>+44 1234 567890</p>
            <p>contact@mettesmuse.com</p>
        </div>

    </div>
   </footer>
  )
}

export default Bottom