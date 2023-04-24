import { Spin } from "antd";
import './style.css';

export default function Loader({h}) {
    return <div className="loader" style={{height: h || '100%'}} >
        <Spin size="large" />
    </div>
}