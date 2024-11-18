import ParallaxImg from "../components/parallax-img";

export default function AboutUsPage() {
  return (
    <section>
      <ParallaxImg />
      <br />
      <div className="about-us--container">
        <h5>Meine kulinarische Reise durch den Web-Code</h5>
        <p>
          Hallo liebe Foodies und Tech-Enthusiasten! Ich freue mich sehr, euch
          meine neueste Kreation vorzustellen: die Rezeptwelt, die nicht nur das
          Herz von Kochbegeisterten höher schlagen lässt, sondern auch einen
          Einblick in die faszinierende Welt der Webentwicklung gibt. Dieses
          Projekt entstand im Rahmen meines "Full Stack Web-Developer" Kurses
          bei Supercode und ist das Ergebnis meiner Leidenschaft für Essen und
          Technologie.
        </p>
        <br />
        <h5>Warum eine Rezepte-Website?</h5>
        <p>
          Essen ist mehr als nur Nahrungsaufnahme. Es ist ein Erlebnis, das alle
          Sinne anspricht und uns mit Menschen verbindet. Ob ein
          selbstgebackenes Brot, ein aromatisches Curry oder ein einfacher Salat
          – das Kochen ist für mich eine wunderbare Möglichkeit, Kreativität
          auszuleben und Freude zu schenken. Mit dieser Website möchte ich meine
          Begeisterung für die Küche teilen und anderen die Möglichkeit geben,
          neue Rezepte zu entdecken und auszuprobieren.
        </p>
        <br />
        <p>
          <h5>Die Technik hinter dem Genuss</h5>
          Um diese kulinarische Plattform zum Leben zu erwecken, habe ich mich
          für die leistungsstarke Kombination aus React und Supabase
          entschieden. React, eine beliebte JavaScript-Bibliothek, sorgt für
          eine dynamische und benutzerfreundliche Oberfläche. Supabase, eine
          Open-Source-Alternative zu Firebase, übernimmt die Rolle des Backends
          und bietet eine einfache Möglichkeit, Nutzer zu authentifizieren und
          Rezepte zu speichern.
        </p>
        <br />
        <p>
          <h5>Was erwartet dich auf meiner Website?</h5>
          <ul>
            <li>
              <b>Rezepte für jeden Geschmack: </b>
              <p>
                Ob du ein erfahrener Koch oder ein Anfänger bist, hier findest
                du eine vielfältige Auswahl an Rezepten für jeden Anlass.
              </p>
            </li>
            <li>
              <b>Community-Feeling: </b>
              <p>
                Teile deine eigenen Kreationen mit anderen Nutzern und lass dich
                von neuen Ideen inspirieren.
              </p>
            </li>
            <li>
              <b>Personalisierte Empfehlungen: </b>
              <p>
                Dank der intelligenten Suchfunktion findest du schnell die
                passenden Rezepte für deine Vorlieben.
              </p>
            </li>
          </ul>
        </p>
        <br />
        <h5>Warum ich stolz auf dieses Projekt bin</h5>
        <p>
          Die Entwicklung dieser Rezepte-Website war für mich eine spannende
          Reise. Ich habe viel über React, Supabase und die Grundlagen der
          Webentwicklung gelernt. Aber das Wichtigste ist, dass ich ein Projekt
          geschaffen habe, das mich selbst begeistert und hoffentlich auch
          andere anspricht.
        </p>
      </div>
      <br />
    </section>
  );
}
