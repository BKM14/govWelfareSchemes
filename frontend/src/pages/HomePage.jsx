import { MainContent } from '../components/MainContent'
import { MainContentData, data } from '../data'

export function HomePage() {
    return <>
        <MainContent data={data} MainContentData={MainContentData}></MainContent>
    </>
}