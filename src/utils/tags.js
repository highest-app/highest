import i18n from '@/plugins/i18n'

function tagName(tag) {
  return tag.default ? i18n.t(`terms.colors.${tag.color}`) : tag.name
}

export default tagName
