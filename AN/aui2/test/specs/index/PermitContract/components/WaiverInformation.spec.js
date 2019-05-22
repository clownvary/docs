import React from 'react';
import { mount } from 'enzyme';
import WaiverInformation from 'index/PermitContract/components/WaiverInformation';
import Information from 'index/PermitContract/components/WaiverInformation/Information';
import Waiver from 'index/PermitContract/components/WaiverInformation/Waiver';

const infos = [
  {
    description: 'A waiver is the voluntary relinquishment or surrender of some known right or privilege.',
    signingStatus: 'Checked',
    transactionstageID: 3518
  },
  {
    description: 'An agreement that you do not have to pay or obey something',
    signingStatus: 'Checked',
    transactionstageID: 3519
  }
];

const waivers = [
  {
    akamaiDirectory: 'http://localhost:8080/jettytest03/',
    attachmentID: 1132,
    attachmentName: 'waiver-sample.pdf',
    dueDate: '12 Oct 2017',
    printPayerAndCustomer: false,
    showSignatureLine: true,
    signatureBase64: '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',
    signingStatus: 'Waiver Signed',
    transactionstageID: 3520,
    uploadfileHrefText: null,
    waiverFor: '',
    waiverName: 'Waiver 01 - Signed - Jun.19 15:21',
    waiverText: 'Definition of Waiver 01 which was signed by Active Network at Jun.19 15:21.'
  },
  {
    akamaiDirectory: 'http://localhost:8080/jettytest03/',
    attachmentID: 1132,
    attachmentName: 'waiver-sample.pdf',
    dueDate: '12 Oct 2017',
    printPayerAndCustomer: false,
    showSignatureLine: false,
    signatureBase64: 'iVBORw0KGgoAAAANSUhEUgAAAgQAAACaCAYAAADW8VCMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABj9SURBVHhe7d1PaFzV38fx6VNafoL/N7bgwoJguqqKYgtCFRemIFhBNG5sXYhW0daVEZGoCG1Xtau0q9pV60q7agXxzyoqQnVVBaXiRncVBCsI5rnv89xvfrfzzCT3zr2TmTvzfsEwk0kymZm0OZ9zzvecs2E505EkSVPtf/JrSZI0xQwEkiTJQCBJkgwEkiQpYyCQJEkGAkmSZCCQJEkZA4EkSTIQSJIkA4EkScoYCCRJkoFAkiQZCCRJUsZAIEmSDASSJMlAIEmSMgYCSZJkIJAkSQYCSZKUMRBIkiQDgSRJMhBIkqSMgUCSJBkIJEmSgUCSJGUMBJIkyUAgSZIMBJIkKWMgkCRJBgJJkmQgkCRJGQOBJEkyEEiSJAOBJEnKGAgkSZKBQJIkGQgkSVLGQCBJkgwEkiTJQCBJkjIGAkmSZCCQJEkGAkkV/PDDD+kiafIYCCSVQhDYvn17unz11Vf5vZImhYFAUim///57uv7Pf/7TueOOO9JtSZPDQCCpkhdffLGzZcuW/CNJk8JAIKmSHTt25LckTRIDgaRS/v777/yWpElkIJBUyrlz5/JbkibRhuVMfluS+tq6dWsqLLx06VJnZmYmv1fSpDAQqFVY+hbV7t1uvvnmzt13351/pCaxzHDXrl0pCBAIJE0epwymwCRsJPPdd991nnjiibQG/uGHH+55ueeeezrPPfdc/h1qUtQPPP300+la0uRxhGDC0ZDSULJufGFhobN///78M+0Rr4H17zz/2267Lf/Mtb788svOF198kb7m1KlT+b1qAu8roYv3tY3/hiSVQCDQZMuCwPLNN99M8FvOgsFy9kc9/0w77N27dzkLA8uXL1/O7+nt6tWry7Ozs+l1njlzJr9XTTh//nx6X9v2b0dSeU4ZTIG33367kzWmncOHD6ehX4bVKRB7//33x34pGdMdH3/8cdoMZ63d8RhBeP3119Ntl8g16+TJk/ktSZPKQDAlKLibn59PweDYsWPpvtdee62zbdu2sQ4Gp0+fTtduhjM6TNkQysC/I0mTyUAwZehFHzp0KAWDxcXF9HEEA0YS/vjjj/wrR4/nc+TIkbRyYO/evfm9Wm/vvPNOfqvT2blzZ35L0qQxEEwpggDD8AQDCsX4mD/84xIM6JXyfAgDn3/+uT3TEYkpG3B+gWcYSJPLQKBUNR7BgD/4EQwYOei35n/YeA6ElPPnzxsGRujChQv5LUcHpElnINAKggGbznz00UepgI/aglEEA0YoopCwao+UEKHmsJQzWMchTTb3IVBfNMpHjx5Nu9TR0BIYqOIf5ln4sedAnamCEydOdObm5hxZaMAtt9yyMn3klsXSZHOEQH1RyLe0tJQaZoaLaWgZMWDZ4i+//JJ/VbOamCpgZGGawgDz/Nddd13juzQSziIMPPTQQ4YBacIZCLQmGgNCARduf/DBByvBgEajKbG8bZCpgmnGdA7LRvm9nD17Nr+3PnYnDC+88EJ+S9KkMhCotAgGFy9eTKMHNEAM73PGQBPBIEYHYnMhVdfkfhJRP0A4c9mnNPkMBKqM+X0KDyMY0KuPYEC9wSAcHWhGkysBYoSAegyLNaXJZyDQwCIYsGSRgkMadI7I5RCc4nBzGY4ODC5GBZjjb2qen2AX9QO7d+9O15Imm4FAtbHqgD0MIhjEyXhciuvY+ymeV+DoQHVxzkCTRxMXzy6wmFCaDgYCNaYYDNgemV7mnj170nQCDX4/sceB69yrK+4k2NRyUEYGojiRURsDgTQdDARqHA0TByhFMKDRor5grWCg6oaxYRTFosVpCEnTwUCgoWH4P4LBwsJC2ruAYMCSRRqdMK4nLbbBMN47TpiMfRzcrliaHgYCDR3BgO2IIxgwJM0eBhEMmK9maHp2djb/DpV17ty5/FYzqP9gxUeMDNx1113pWtLkMxBo3dDrjGBw+PDh1LslGDCN8MADD7jV8ACanoI5fvx4CmesIAF7T0iaDgYCrTsa/vn5+RQMXn755XQfm+AwYsCBSk4hlENvnhqCphrt4l4Q3GZkJ4JBW1Cv0sQmWdI0MhBoZOiJPvnkk+n2s88+mz7mZEWCASMJsQ5evX344Yfp+vHHH0/XdcVeEGxTzAqRtk3hEAa2b9+eileb3MJZmhYGAo0F9ixgxIBlizRKNE4Gg9XRm2eu/8cff0wf1ykALI4OxG6Tjz76aLpui+KKC0eZpOoMBBqp7j/cbGwUwYAh6wgGjBwMY4ldW8V0AZsRRTCos0QwdpZkV8I4w6BtIwSGAKkeA4FGqt8KA4IB5++zNTL7GlBbYDD4r5gu4L2JYFDH119/na4ZZSBgUJfQtiLP4u6KkqozEGhkymxZzOFJHKJEMKDALYLBgQMH0r4G0ypGBWI6pe5+AVFEyHvKY7bt/IL4t9S2IkhpnBgINDLR0y+zZTHBYGlpKR2/TON34sSJFAxYtjhtwaA4XfD999+n++oEAgIADSqPcfTo0TRiQ0hrk/i3ZCCQBmcgUKswlE0o4MJtNjaKYDAty81iuoBpFl4z0wZ1hveL79taIzbjyvoBqT4DgVopggHTCYweEAxYbsbWyJMeDGi0CQFMGfBa6/aKY+6dUQJGB9p4BHXUorRtZYQ0TgwEajUaQ+oLIhjQWEYwiOVzkySmC+bm5laCT51TInks3jNGGAgEbRwd4Pfc1pENaZwYCDQRIhiwZJEVCjQQu3btSvsbxJK6SRAhgK2e43XV2amQDXwYbqeOoK2jAxzGBDZUkjQ4A4EmCkPp7GEQwYBGk1DA5cKFC/lXtVdxeSD7BdCI1ykoLC7Va2sPm/BXdx8GSQYCTahiMDh06FAaVt6zZ0+aTqABaStGCGi0uXCbMEAoGARhiWmCsG/fvvxWe8QUSuzDYHGhNDgDgSYaweDYsWMrwYAGkPqCNgaD4vJAwkDd/QJi+gEEjDYu2YsVF9RUII6DrjNqIk0rA4GmAg1eBIOFhYW0dwHBgCWLrFBog2jAKSKMgsk69QMx/YC2bVMcuqcLnD6QBmcg0FQhGHBgUgQDetnsYdCGYHD8+PE0PcBcfzTmdXr1xRGCNi7XIxQVpwu6P5ZUjYFAU4lldhEMDh8+nOaeCQZbt25N2yOP21w0jTe93yj84+M6GxLF9ENo4whB966K8TvjfZFUnYFAU40GdX5+PgUDphTAAUqMGIxTMODUx1gWSGNOIGhqdIBphzo7HY5Cd0CSVJ+BQMrQ2FJ0SDBYXFxMH0cwYCSBRnhUuhu/6NnX2ZCoGAiGfZAR79+GDRsaXfZZDEiSmmEgkApiCJpgwLJFPqbxaTIY0KCzXI5LsWHuh69DNNxNDI1HDUK83mHhtfL+gfn9Jjg6IA2HgUDqg42NIhjQ8EQwYOSgauNGw0gPmZUN27dvX9ksieWP7Ba4muJmRE2JIDLsRnUYJ1H2Gx2I19TG5ZPSODAQaGT4o46meo7DQjC4dOlS2hqZXjm1BVWCASMLhAA2RiIU0AizwoELBY1rFfTR0NFoN9VwR0Fhr0a1acWdEJuw2ugAOzdSC2EgkAa0LI3I1atXl7M/6unC7bbIgsFy1ltf5r9P1qguZ43T8uXLl/PPXitr9NPXZY3Uctb4L//222/5Z8q5cuVK+v69e/fm9ywvf/755+m+U6dO5fdUE99/6NCh/J7hKL72Os+3iPeB97zX+5iFgWveJ0nVOEKgkYkeKr3sAwcO5PeOP05VXFpaSscvM4x/4sSJNGLAssXiEDkjAwxv02Pla1nNULWXH8PgxQLCuisf2M8AwywmZE+AeO2MhDRhtdEBPsfIx7ALJKWJlgcDaSQYGZidnU09yGPHjuX3tgs97oceeii9Bi779+9fPnv27ErvmF7+oHr1iHmfeGxGKqrKgszK86w6WlEFoyb8jEuXLtUe0QirjQ7Ee3Lx4sX8HklVGQg0cm2dOuhGY0SjFQ3uxo0blz/99NP8s9XxeDxO99D+3Nxcun+QBj0aat7rYeLxZ2Zm0u0IIUyZDOr8+fM934vA+86UgaTBGQg0FqKHR++67WJ0IC40VjSKVfXrEdPQDtqg833xnIYlage4RhOBj5GWfqMDsH5Aqs9AoLFQnDpoeyiIhvybb75JryWCAdMKDJ+XwVA739PdI+5VZFhWDN1zica6acVCwuJUSQS+M2fO5PeUx/fwvf1GB2Ikpa1TTtK4sKhQYyFrQNOyPpbgccgQS/vaqFj4dv/996c9DNjLgKWLbDAU+w+stWtffH7fvn3pOtTZpTCOCgbFfk3jtReLKIvbIcfPq1oQSaEgyzt5rH5LJOPkx2G8JmmaGAg0NiIUbNmyJR1cMy7nCFTRa9Mc9i6IYJD1clMDxp4EbEpEeOil35r6OrsUFn9Wk5schXjt58+fb+xshDfeeCOtQsl6/31XaDRx8qMkA4HGTDSmNAI0mrFtbxuwzLDfsjjQiNOwRTCgt8/Ohb2CAa+bQ4eaEkcDg+fWr3EdFCMaq732QTDiwJLOubm5NMLSD1/He9tUCJGmVj51II0V5qKzP/BpbnhxcTG/d3xFJX3WSy29zJACueLrzBq1tDQvHqvXnPigS/ioOeD7uAyj+I7XnYW5vkV/gzzvqMVYbTVFnZoKSddyhEBjid42PWl6mwxFj/v0wenTp9P1mTNnSvdUeW3xOrNgkObL2dzokUce6WzatCn1jJsQdQ0xTVDnlMReOIuBn9H06ECZEQe+Dk2/JmkaGQg0tmhY2zJ9QOM1MzOTLmUwXRCNGa8zgsGrr77a+euvvzr//PNPmkqguLJuGIq5/YMHD6aPB6k/6IffzVpFf4PoVYvRS7yH1g9I9RkINNaYa6f3zB9+qvPpQY+bmJ9/+umn83tWRxjgsKPukw5pVH/99dfUEL777rvpPhpbtkUeNBiU7WkPKg54Wq3or6oqz3kYJ0FK08pAoLEXvedYkjhuoYAVETTiNGBlxPQCio08wSIawrfeeiu95sXFxfTYEQx4/VWU7WkPgoabQMPvZbWiv6qqPGeeA6FhGGFHmjYGArUCvefiPgXjEgro7VfpgRNujhw5kl5Pt3PnzqXrF154IV1HyCAYsGyRjyNM8DOpOVhNMWAMo8GMKRyOcG4K70/Z5xzHODs6IDXDQKDWoEEct1AQS/nKFLXReNH7Zb6bBr4bve1+dQj0wAkG0WsmPDBiEEP2vZw8eTJdR8BoWr+9Enrhd4dPPvkkXfdCGIj3h2mitTA6AAsKpWYYCNQq3aGgTTsaRsNNcV/3CAGNG0cnr1WHwOvGK6+8kooDef29ggG95xjOL1voWFWVvRLoxfNceE40/Hxv8cIGRBEGunc57CcCgQWFUjMMBGodQkH0IGkIi4V5661Kod9qvWMaRZRtYO+9997OxYsXUziiQYxgcODAgRQseE94bsMaHSCMETp2796d37O2+J3R8McWznFhGqVKGIAFhVKzNrAZQX5bahV6lTQkrNdn/f8osNMgu/QxnL/anDe9WVYVRKPHxzSETB0wHRCPc+XKlZXh9V4IDsXvC9xPQxvB4tZbb+1s3LhxZdUC+n1vVUx98FpouAklVeoTCC69ah94jtQNlA0DYKUGj/Xbb7/l90iqJW1PJLXUbH5C4iCn6NXV70TCXrp33eveuS9rCNNpiGtZa8c/Pn/fffelr+GSNfzpNMD43GrfWwanUs7MzKTH4fFGZRQ7FPL7liaZUwZqtSiyq7t5zyDKFhSuVTlPz73q8Hs/TDncfvvtnc2bN6/UWdCbZwTip59+yr9qcExJMELA8H+TZy1UtV4FhbxWfn+MRnDh9yhNKgOBNERlKufjWOImtiqOQ4ZeeumldOogQ/pZLzrd9/zzz6ev+fnnn9N1VdQlEDAIAryuURpWQSFLNZnWIEBt3bo1hQB+fwTO+fn5laJOaRIZCNRq/ZbcjQMarTKV8zTW/ZYbVkVdBfPxMXLCz6bwMDZ2wnvvvZdqCaLeoAxGMCjg5DWMql6j6Mcff0zXdd4zGn9OU2TUY9euXZ0NGzaka14nvxNWcRACCFW8f+y3sFp9h9R2BgK1Fr3UZ555Jv9o/NDQ0IDQU+8XBljLT6gpu+3xaujBE0J6TU3QuEVIePDBB1cKDLkwqrAWggbPs8ktiuvgdfLelg0EDP3z/tDY85qj8ed3RCjg8Rj5IAAQoK5evdpZWlpKIaDpUQhpbOW1BFIrUNhFMVv2hzsVlWV/rJezP9qljxxu0mpFehQ58rl+BYfxvRQTcl22YK3fz6RYMWuo0+OVOYI46/Gm50ahI/fxPmYNYf6V16Ioka+Zm5vL7xk9XifPuR/eT47N5jnzvvD848L3UsDJvyF+TxYLSv/HQKCBrHZGfROi4Y9L1stOFeXFP+w0CKMIAiFCSZ3GmQtV+2UVG/UiGr5e9xf1+l6e31rBoHuFxKjxPHiuxYBCaOkXAGj8FxYW0r8hgpCk3gwEqozGmj+0w1jqxx/27oY/LjRKL774YvrjPqpRgRDvQa9QUqVx5sLrKatXo873cx9LMFfTL0yARpbHiRGLO+64I30djSgfl1lauV7iObGkkudMoOLjuOzcuTOFNV6vpPIMBKpstYaliuIoQHEEoNjwx4UAMC49VPR7D3iu3L9W4xyjC1V73t0/N35emdGSMr83HoPHjGCwefPm5U2bNo3Fe8+/F0YB6PHz3OJCeCGw8G+IfRIkDcadClUZ1dkUZGU94YG2xmUJFwfvdK/pzhrHVBBH8ds4FK6tpteuf8Ulhlnj27eQkAI3lrMha8hSoV5ZxZ/LFsVlfl7o9Zz7YVUBBXexLTS/D34v/H74Pa0HCv34t0bhJc+9uKKE58DzYUklr19SA1IskCqiB8w/n0Ev3aMA4zYCsJbobcfQdPT4y/TUl5aWVt6H1XrrvcT3xjB5mZ8XyowQBH4XzMXfdNNNy+++++7KvDzXWYAZWk+cKSN6+/T6+XlxKU4DMHrBKIGkZjlCoIHQy2e5Vq996ddC744e6riPAqwmRkmKyvbUweY3vIf0uMt8fdGePXvSUsEqPw9VRghYzsnoQHwtz5VNiY4ePZpGJvjdMTrECEfV599L7HPAzwDLJOn9P/roo2k5YIxKMGrAzotZiBz55kjSxEmxQFJl9JSLIxxle+p10TtnLr3qzys7QsDr4ev61UHw/dGDp7fO19d57cz9xwgEP5NRgn6qjHJIqsZAIE2JMo1phIEyUxE8TkxdEAwY6i8z7dNriSDfX6aRNxBIw+NOhZLSUDz791cpUmQq4dKlS2lnP4b4mQbZtm1bGvrv3lKax+d+Ps+QfxQs8n3z8/PpcdaaxpA0XNYQSFOi1+qQ4ooP5umpaVhYWBioLoDHoMaAn8NjPfbYY50bb7yx89lnn6W6A/SrDSirSh2EpGoMBNIUiYLEoggCTS33pNF+7rnnVkLA9ddf33nqqac6r7zySu0lggYCaXgMBNIU6V4dQhigYW1yxUfsx3DnnXemkYZvv/023c/POXjwYK1QwLQEUw8XL16sHS4kXctAIKkxvTZnon6A+2IjKqYMmJYYpEGnzoFRgitXruT3SGqKgUBSI2IHxmIYKOoVDJim2LlzZ/q4jFtuuSXVHlDIKKlZrjKQ1IhYWcC0QK+iRIICDfnly5fT9AHBgCJHagLo9a+FQMFUx+7du/N7JDXJQCBpXbHSgKLACAZRKMilu+CxKOoeBlkBIWltBgJJI1EMBmyBzHJFVkGwT0FMK0haPwYCSY2IPQU++eSTdF0WwYATHyMYUItA8aDBQFpfBgJJjaA4cHZ2Nu1AyNLGqlj6GMGAVQjsY0AwYHdDDj1iyaSk4XGVgaTGFE+BrLt5EDUD7Dtw/PjxdPuGG27o/Pnnn2mb45mZmfyrJDXFQCCpUTTibGEMevtVtyfuRhhgxOHNN9/s/Pvvv2kkgeWK7K5Y97El/ZdTBpIaRR0ADTbLEDnEqC5WFbD3AGGAMxAQByURPpxKkJphIJDUOHrv1BMw98+5BnUx4sBoAI/HqMPi4mL6OIIBOyTGskRJgzEQSGocjTWbEDURClh1wGoDQgbTBTw2twkG1CnwMTsgGgykegwEkoaiOxTQWA8idkDcsWNHui6iaDGCAWEhggEjB/F9ksoxEEgamggFrApg2J/th6sqUyNAMGD1AT+LfQ2oLTAYSNUYCCQNFaGAHjwNO1MHVYsAT548mR6DkYa1cGASRyMTDDg7IYIBxY3sayCpPwOBpKFj06L5+fk0QsD2xGUOM0J3/UBZBIOlpaV06iI/m2WLBAMCicFA6s1AIGldsPsgF0IBBxmVKTSMxrtX/UAZLFckFHDhNrUMEQwGmb6QJpkbE0laV6wCeOaZZ9LJhsz9M53QD1sX83UUDlYZIeiHEEDhYZyRwEgCIYXpBWnaGQgkrTvqCKKxp+d+8ODB/3esMYckHTlyJG10xBkHTeoVDNhMiekFaVoZCCSNBKGABj/OKuiFnjvD/d1hoSlMSRAMmEoA4YQRA66laWMgkDRShAEa5O5QwMoCigmHFQaKegUDRgzKrGyQJoWBQJJyBANGLFiVwAgGIxSMGDClIE22Tud/AYcLcIOQTgCJAAAAAElFTkSuQmCC',
    signingStatus: 'Waiver Signed',
    transactionstageID: 3521,
    uploadfileHrefText: null,
    waiverFor: '',
    waiverName: 'Waiver 01 - Signed - Jun.19 15:21',
    waiverText: 'Definition of Waiver 01 which was signed by Active Network at Jun.19 15:21.'
  },
  {
    akamaiDirectory: null,
    attachmentID: '',
    attachmentName: '',
    dueDate: '12 Oct 2017',
    printPayerAndCustomer: false,
    showSignatureLine: false,
    signatureBase64: '',
    signingStatus: 'Waiver Signed',
    transactionstageID: 3522,
    uploadfileHrefText: null,
    waiverFor: '',
    waiverName: 'Waiver 02 - Signed - Jun.19 15:21',
    waiverText: 'Definition of Waiver 02 which was signed by Active Network at Jun.19 15:21.'
  },
  {
    akamaiDirectory: null,
    attachmentID: '',
    attachmentName: '',
    dueDate: '13 Oct 2017',
    printPayerAndCustomer: false,
    showSignatureLine: true,
    signatureBase64: '',
    signingStatus: 'Waiver Signed',
    transactionstageID: 3523,
    uploadfileHrefText: null,
    waiverFor: '',
    waiverName: 'Waiver 02 - Signed - Jun.19 15:23',
    waiverText: 'Definition of Waiver 02 which was signed by Active Network at Jun.19 15:23.'
  }
];

it('Information should render without errors', () => {
  const props = {
    infos,
    display: true
  };
  const component = mount(<Information {...props} />);
  expect(component).toBeTruthy();
  expect(component.find('table.table.an-table.info-table')).toHaveLength(1);

  const rows = component.find('tr');
  expect(rows).toHaveLength(3);
  expect(rows.at(0).find('th')).toHaveLength(2);
  expect(rows.at(1).find('td')).toHaveLength(2);
});

it('Waiver should render without errors', () => {
  const props = {
    waivers,
    display: true
  };
  const component = mount(<Waiver {...props} />);
  expect(component).toBeTruthy();
  expect(component.find('table.table.an-table.waiver-table')).toHaveLength(1);

  const rows = component.find('tr');
  expect(rows).toHaveLength(12);
  expect(rows.at(0).find('th')).toHaveLength(4);
  expect(rows.at(1).find('td')).toHaveLength(4);
  expect(rows.at(2).find('td')).toHaveLength(1);
  expect(rows.at(3).find('td')).toHaveLength(1);

  const attachmentLink = rows.at(1).find('a.waiver-attachment');
  expect(attachmentLink).toHaveLength(1);
  attachmentLink.simulate('click');

  expect(rows.at(3).find('td').find('img')).toHaveLength(1);
});

it('WaiverInformation should render without errors', () => {
  const props = { waivers, infos };
  const component = mount(<WaiverInformation {...props} />);

  expect(component).toBeTruthy();
  expect(component.find('section.section-container.waiver-information')).toHaveLength(1);

  const hiddenPanel = component.find('div.collapse-panel__body.hidden');
  expect(hiddenPanel).toHaveLength(1);

  const expandIcon = component.find('span.collapse-panel__title').at(0).find('i');
  expect(expandIcon).toHaveLength(1);
  jest.useFakeTimers();
  expandIcon.simulate('click');
  jest.runAllTicks();

  const expandPanel = component.find('div.collapse-panel__body.expanded');
  expect(expandPanel).toHaveLength(1);

  expect(component.find('table.table.an-table.info-table')).toHaveLength(1);
  expect(component.find('table.table.an-table.waiver-table')).toHaveLength(1);
});

it('WaiverInformation which only has infos should render without errors', () => {
  const props = { infos };
  const component = mount(<WaiverInformation {...props} />);

  expect(component).toBeTruthy();
  expect(component.find('section.section-container.waiver-information')).toHaveLength(1);

  const expandIcon = component.find('span.collapse-panel__title').at(0).find('i');
  expect(expandIcon).toHaveLength(1);
  jest.useFakeTimers();
  expandIcon.simulate('click');
  jest.runAllTicks();

  expect(component.find('table.table.an-table.info-table')).toHaveLength(1);
  expect(component.find('table.table.an-table.waiver-table')).toHaveLength(0);
});

it('WaiverInformation which only has waivers should render without errors', () => {
  const props = { waivers };
  const component = mount(<WaiverInformation {...props} />);

  expect(component).toBeTruthy();
  expect(component.find('section.section-container.waiver-information')).toHaveLength(1);

  const expandIcon = component.find('span.collapse-panel__title').at(0).find('i');
  expect(expandIcon).toHaveLength(1);
  jest.useFakeTimers();
  expandIcon.simulate('click');
  jest.runAllTicks();

  expect(component.find('table.table.an-table.info-table')).toHaveLength(0);
  expect(component.find('table.table.an-table.waiver-table')).toHaveLength(1);
});
