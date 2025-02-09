import React from 'react'
import styles from './SectionContent.module.css'

interface SectionContentProps {
  content: string
}

const SectionContent: React.FC<SectionContentProps> = ({ content }) => {
  return (
    <div 
      className={styles.sectionContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default SectionContent