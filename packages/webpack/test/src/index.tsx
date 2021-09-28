import { VFC } from 'react'
import { render } from 'react-dom'
import './assets/style.less'
import './assets/style.scss'
import styles from './assets/style.module.less'
import imageUrl from './assets/image.svg'
import { ReactComponent as SVGImage } from './assets/image.svg'

const App: VFC = () => {
  return (
    <div>
      <SVGImage fill={'black'} />
      <img src={imageUrl} alt={'test'} />
      <span className={styles.testClass}>Some text</span>
    </div>
  )
}

render(<App />, document.querySelector('#root'))
