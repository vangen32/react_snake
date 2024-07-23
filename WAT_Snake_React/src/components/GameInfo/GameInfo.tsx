import { Component } from "react";
import "./style.css";

export class GameInfo extends Component<any, any> {
  render() {
    return (
      <div className="basis-1/4">
        <div className="nice-container flex flex-col gap-3">
          <h3 className="text-center text-secondary font-bold">Що поїсти?</h3>
          <div>
            <img
              src="/food/food_1.png"
              className="w-10 h-10 object-cover inline-block"
              alt=""
            />
            <span> - зелене яблуко +1 очко</span>
          </div>
          <div>
            <img
              src="/food/food_5.png"
              className="w-10 h-10 object-cover inline-block"
              alt=""
            />
            <span> - напівстигле яблуко +5 очок</span>
          </div>
          <div>
            <img
              src="/food/food_10.png"
              className="w-10 h-10 object-cover inline-block"
              alt=""
            />
            <span> - червоне яблуко +10 очок</span>
          </div>
          <h3 className="text-center text-secondary font-bold">Особливості</h3>
          <ul>
            <li>Змія росте за кожні 10 очок</li>
            <li>Можна проходити крізь стіни</li>
            <li>
              Натисніть двічі або затисніть кнопку напрямку руху для прискорення
            </li>
            <li>Space - пауза</li>
            <li>По закінченню гри Ви можете зберегти свої результати</li>
          </ul>
        </div>
      </div>
    );
  }
}
