import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { Head } from '../components/head'

import { PostTitle } from '../components/post-title'
import { PostContainer } from '../components/post-container'
import { SocialShare } from '../components/social-share'
import { PostNavigator } from '../components/post-navigator'
import { Disqus } from '../components/disqus'
import { Utterences } from '../components/utterances'
import { Orderbar } from '../components/orderbar'

import * as ScrollManager from '../utils/scroll'

import '../styles/code.scss'

export default ({ data, pageContext, location }) => {
  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl, author } = metaData
  const { disqusShortName, utterances } = comment

  return (
    <Layout location={location} title={title}>
      <Head
        title={post.frontmatter.title}
        description={post.excerpt}
        keywords={post.frontmatter.tags}
      />
      <PostTitle title={post.frontmatter.title} />
      <PostContainer html={post.html} />
      <Elements.Hr />
      <SocialShare title={post.frontmatter.title} author={author} />
      <PostNavigator pageContext={pageContext} location={location} />
      {!!disqusShortName && (
        <Disqus
          post={post}
          shortName={disqusShortName}
          siteUrl={siteUrl}
          slug={pageContext.slug}
        />
      )}
      {!!utterances && <Utterences repo={utterances} />}
      <Orderbar
        naverOrder={post.frontmatter.naverOrder}
        coupangOrder={post.frontmatter.coupangOrder}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        naverOrder
        coupangOrder
        date(formatString: "YYYY.MM.DD")
      }
    }
  }
`
