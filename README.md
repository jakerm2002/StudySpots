- Project Members:  
    - Jake Medina (jrm7784) - jakem02  
    - Vincent Chen (vc22466) - vincentchen913
    - Ami Iyer (ai6259) - amrithaiyer02
    - Joanne Chen (jjc4985) - chen.joanne  
    - Bianca Alvarado (bma2335) - bianca.alvarado

- Git SHA:
    - Phase 1: 23c9ba97666ba4f6fb69548ce5b46e73723ba88e
    - Phase 2: c0f8e6c565b1d4695224a96c119a0d23f4dedf17
    - Phase 3: 8603468206f5b05e5255351c2478c62e4b0f5052
    - Phase 4: 74d0a1f7ea1910c53a821acfe1257b08d52187f8

- Project Leaders:
    - Phase 1: Joanne Chen
    - Phase 2: Jake Medina
    - Phase 3: Ami Iyer
    - Phase 4: Bianca Alvarado

- GitLab Pipelines:
    - https://gitlab.com/jakem02/cs373-idb/-/pipelines

- Link to Website
    - Main branch: https://studyspots.me/
    - Develop branch: https://develop.studyspots.me/

- Estimated Completion Time
    - Phase 1:
        - Jake Medina: 16
        - Vincent Chen: 15
        - Ami Iyer: 15
        - Joanne Chen: 15
        - Bianca Alvarado: 10

    - Phase 2:
        - Jake Medina: 21
        - Vincent Chen: 20
        - Ami Iyer: 21
        - Joanne Chen: 20
        - Bianca Alvarado: 21

    - Phase 3:
        - Jake Medina: 17
        - Vincent Chen: 14
        - Ami Iyer: 15
        - Joanne Chen: 17
        - Bianca Alvarado: 16
        
    - Phase 4:
        - Jake Medina: 14
        - Vincent Chen: 14
        - Ami Iyer: 14
        - Joanne Chen: 15
        - Bianca Alvarado: 15

- Actual Completion Time
    - Phase 1:
        - Jake Medina: 25
        - Vincent Chen: 25
        - Ami Iyer: 25
        - Joanne Chen: 25
        - Bianca Alvarado: 15

    - Phase 2:
        - Jake Medina: 25
        - Vincent Chen: 25
        - Ami Iyer: 25
        - Joanne Chen: 25
        - Bianca Alvarado: 25

    - Phase 3:
        - Jake Medina: 26
        - Vincent Chen: 20
        - Ami Iyer: 23
        - Joanne Chen: 25
        - Bianca Alvarado: 21

    - Phase 4:
        - Jake Medina: 16
        - Vincent Chen: 16
        - Ami Iyer: 16
        - Joanne Chen: 17
        - Bianca Alvarado: 18

- Comments:
    - Frontend filtering and sorting components and university visualization based off of UniverCity: https://gitlab.com/coleweinman/swe-college-project
    - Inspiration on database structure from: https://gitlab.com/giveandlive/giveandlive/
    - Used https://gitlab.com/giveandlive/giveandlive/-/tree/260215fb5f072e5af9e076c5f296f2cf01db9476/back-end to be able to deploy on aws elastic beanstalk
    - Inspiration on how to implement searching/sorting/filtering ui toolbar from: https://gitlab.com/coleweinman/swe-college-project/-/blob/main/frontend/src/components/toolbar/ModelToolbar.tsx
    -  ~~Since we ran out of GitLab CI/CD minutes, we had to try and set up a personal GitLab runner last minute, and we were unable to get the selenium tests working through the runner. However, we did run them locally, so we included a screenshot of them passing in selenium_tests.jpeg.~~ For phase 4, we should have enough GitLab minutes to run all of the tests on the pipeline!
    - Canyon left a comment on our phase 3 submission that he wasn't able to use the price slider on coffee shops. We were unable to replicate this issue using Safari 15.5 or Chrome 107.0.5304.121. Please note that the slider must be dragged pretty far one way or the other in order to initiate filtering. Dragging the rightmost point towards the \$ will filter down coffee shops to a price value of 1 only, and dragging the leftmost point towards the $$ will filter down coffee shops to a price value of 2 only.
