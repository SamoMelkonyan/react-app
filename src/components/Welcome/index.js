import React , {Component} from 'react';

import './index.scss';

export default class Welcome extends Component {
    render() {
        return(
            <div className="flex-center position-ref full-height">
                <div className="content">
                    <div className="title m-b-md">
                        Laravel + React
                    </div>
                </div>
            </div>
        )
    }
}