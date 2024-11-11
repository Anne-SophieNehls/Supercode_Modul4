import LovedRecepts from "../components/Loved-recepts";

export default function ReceptPage() {
  return (
    <section>
      <h3 className="bg-img">
        Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
        unvergessliche Momente bei Tisch.
      </h3>
      <LovedRecepts />
      <h2>Neuste Rezepte</h2>
      <article>
        <img src="" alt="" />
        <div>
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </div>
      </article>
      <article>
        <img src="" alt="" />
        <div>
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </div>
      </article>
      <article>
        <img src="" alt="" />
        <div>
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </div>
      </article>
    </section>
  );
}
