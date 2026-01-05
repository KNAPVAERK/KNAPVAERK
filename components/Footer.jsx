import styles from './Footer.module.css'

export default function Footer({ 
  brandName = "KNAPVÆRK",
  cvrNumber = "40292195",
  address = "Stavrevej 512, 5300 Kerteminde"
}) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerLine1}>{brandName}</div>
      <div className={styles.footerLine2}>
        CVR: {cvrNumber} – {address}
      </div>
    </footer>
  )
}