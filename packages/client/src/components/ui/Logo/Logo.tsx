import styles from './Logo.module.scss'

export const Logo = ({ fillColor, size, shadow }: { fillColor: string; size: string; shadow?: boolean }) => {
  return (
    <div style={{ display: 'flex' }}>
      <svg
        className={shadow && styles.logo}
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 163 133'>
        <path
          d='M63 16.4v9.5l2.8.3c3.1.3 2.9-2.4 1.6 23.5L66.8 63h-2.9c-2.4 0-2.9.4-2.9 2.5s-.5 2.5-3 2.5h-3V53.9l-3.2.3c-2.8.2-3.4.8-3.6 3-.3 2.2-.9 2.8-2.7 2.8-1.8 0-2.4-.6-2.7-2.8-.2-2.1-.9-2.8-3-3-2.5-.3-2.8 0-2.8 2.7 0 2.6-.4 3.1-2.5 3.1s-2.5-.5-2.5-3.1c0-2.7-.3-3-2.7-2.7-2.2.2-2.9.9-3.1 3-.3 2.2-.9 2.8-2.7 2.8-1.8 0-2.4-.6-2.7-2.8-.3-2.3-.8-2.7-3.3-2.7h-3l-.3 9.1c-.3 8.7-.2 9.2 1.9 9.7 2.1.6 2.2 1 1.5 6.9-.4 3.5-1.3 12.8-2.1 20.8-2.1 21.2-2.4 23-4.1 23-.8 0-1.4 1-1.4 2.5v2.5h146v-2.5c0-1.5-.6-2.5-1.4-2.5-1.7 0-2-1.8-4.1-23-.8-8-1.7-17.3-2.1-20.8-.7-5.9-.6-6.3 1.5-6.9 2.1-.5 2.2-1 1.9-9.7l-.3-9.1h-3c-2.5 0-3 .4-3.3 2.7-.3 2.2-.9 2.8-2.7 2.8-1.8 0-2.4-.6-2.7-2.8-.2-2.1-.8-2.7-2.8-2.7-2 0-2.6.6-2.8 2.7-.3 2.2-.9 2.8-2.8 2.8-2 0-2.4-.5-2.4-3.1 0-2.7-.3-3-2.7-2.7-2.2.2-2.9.9-3.1 3-.3 2.2-.9 2.8-2.7 2.8-1.8 0-2.4-.6-2.7-2.8-.2-2.2-.8-2.8-3.5-3l-3.3-.3V68h-3c-2.5 0-3-.4-3-2.5 0-2-.5-2.5-2.4-2.5-2.3 0-2.4-.4-3-8.3-.3-4.5-.7-12.7-.8-18.2l-.3-10 2.8-.3 2.7-.3V7h-3.5c-3.1 0-3.5.3-3.5 2.5 0 2.1-.5 2.5-3 2.5-2.6 0-3-.4-3-2.6s-.4-2.5-2.7-2.2c-2.2.2-2.9.9-3.1 3.1-.4 3.7-3.6 3.3-4-.6-.3-2.3-.8-2.7-3.3-2.7-2.4 0-2.9.4-2.9 2.5 0 2-.5 2.5-2.5 2.5-1.8 0-2.6-.7-3.1-2.5-.5-1.9-1.3-2.5-3.5-2.5H63v9.4zm22.8 27.4c.3 3.9.1 4.2-2.2 4.2-2.3 0-2.6-.4-2.6-3.8 0-4.3.7-5.4 3-5 1 .2 1.6 1.7 1.8 4.6zm-49 45c.3 3.9.1 4.2-2.2 4.2-2.3 0-2.6-.4-2.6-3.8 0-4.3.7-5.4 3-5 1 .2 1.6 1.7 1.8 4.6zm97 0c.3 3.9.1 4.2-2.2 4.2-2.3 0-2.6-.4-2.6-3.8 0-4.3.7-5.4 3-5 1 .2 1.6 1.7 1.8 4.6zM93 111v12H74V99h19v12zm-55.2 5.7.3 6.3H31v-5.8c0-6.7.4-7.4 4-7 2.3.3 2.5.7 2.8 6.5zm97 0 .3 6.3H128v-5.8c0-6.7.4-7.4 4-7 2.3.3 2.5.7 2.8 6.5z'
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
