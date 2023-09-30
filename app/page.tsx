import { Input } from './Input'
import data from "../data.json"

export default function Home({searchParams}) {

  return (
    <main>
     <div className="paper container">
      <h1>GMO</h1>
      <p>gm approval database from <a href="https://www.isaaa.org"></a>https://www.isaaa.org/</p>
      <Input />
      <ul>
        {data.filter((item)=>{
          const value = JSON.stringify(item).toLowerCase()
          return value.includes((searchParams.s || '').toLowerCase())
        }).map((item, idx) => (
          <div key={idx}>
            <br/>
            <li>
              {item.tradeName}
              <sub>({item.eventName})</sub>
              <br/>
              {item.tags.slice(0, -1).map((tag) => (
                <span key={tag} className="badge"> {tag}</span>
              ))}
              {item.tags.slice(-1).map((tag) => (
                <span key={tag} className="badge success"> {tag}</span>
              ))}
            </li>
          </div>
        ))}
       </ul>
      </div>
    </main>
  )
}
