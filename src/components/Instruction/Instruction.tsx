import * as styles from "@/css/instruction.module.scss";
import * as button from "@/css/_button.scss";
import playlist_img from "@/assets/instruction/0_playlist.png";
import txt_img from "@/assets/instruction/1_txt.png";
import my_music_txt_img from "@/assets/instruction/4_my_music_txt.png";
import my_music_img from "@/assets/instruction/3_my_music.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Instruction() {
  const [state, setState] = useState(false)

  return (
    <main className={styles.instruction}>
      <h1 className={styles.instruction__title}>Как загрузить плейлист?</h1>
      <div className={styles.instruction__option}>
        <button className={button.button} onClick={() => setState(true)}>Добавить мою музыку</button>
        <button className={button.button} onClick={() => setState(false)}>Добавить плейлист</button>
      </div>
      <div className={styles.instruction__grid}>
        <div className={styles.instruction__grid__slide}>
          <img src={state ? my_music_img : playlist_img} />
          <span>
          {state 
          ? 
          `Откройте плейлисты, зайдите на страницу плейлиста, обязательно именно так, показано на фото, откройте код элемента(F12).

          Найдите элемент в котором лежат треки

          class="CatalogBlock__itemsContainer audio_page__audio_rows_list _audio_page__audio_rows_list _audio_pl audio_w_covers CatalogBlock__itemsContainer--reorderable"

          Можно вбить в поиск через(CTRL + F)
          CatalogBlock__itemsContainer audio_page__audio_rows_list _audio_page__audio_rows_list _audio_pl audio_w_covers CatalogBlock__itemsContainer--reorderable

          Скопируйте его` 
          :
          `Откройте плейлисты, зайдите на страницу плейлиста, обязательно именно так, показано на фото, откройте код элемента(F12).

          Найдите элемент в котором лежат треки
          class="audio_pl_snippet__list _audio_pl_snippet__list"

          Можно вбить в поиск(CTRL + F)
          audio_pl_snippet__list _audio_pl_snippet__list

          Или воспользоваться выделением

          Скопируйте его`
        }
          </span>
        </div>
        <div className={styles.instruction__grid__slide}>
          <img src={state ? my_music_txt_img : txt_img} />
          <span>
            {state 
            ?
            `Создайте txt файл, назовите его “Моя музыка” туда вставьте элемент, сохраните файл и бросьте в приёмник на сайте`
            :
            `Создайте txt файл, туда вставьте элемент, сохраните файл и бросьте в приёмник на сайте`
            }
          </span>
        </div>
      </div>
      <Link to={'/'}><button className={button.button}>Перейти на главную</button></Link>
    </main>
  );
}

export default Instruction;
