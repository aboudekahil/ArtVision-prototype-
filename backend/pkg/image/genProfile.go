package image

import (
	"image"
	"image/png"
	"math/rand"
	"os"
	"path/filepath"

	"github.com/fogleman/gg"
	"github.com/nfnt/resize"
)

const (
	colorMaxValue = 255
)

type Color struct {
	r, g, b uint8
}

type FilePath string

var saveDir string

func init() {
	cwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	saveDir = filepath.Join(cwd, "web", "static", "pfpimages")
}

func GenerateProfilePictureFromEmail(seed string) (FilePath, error) {
	seededRand := rand.New(rand.NewSource(hashSeed(seed)))

	image := genImage(5, 5, seededRand)

	if isReal, err := exists(saveDir); !isReal && err == nil {
		os.Mkdir(saveDir, os.ModePerm)
	}

	filePath := filepath.Join(saveDir, seed+".png")
	webPath := filepath.Join("pfpimages", seed+".png")
	outputImage(image, FilePath(filePath))

	return FilePath(webPath), nil
}

func outputImage(image image.Image, path FilePath) error {
	newImage := resize.Resize(1024, 1024, image, resize.NearestNeighbor)

	f, err := os.Create(string(path))

	if err != nil {
		return err
	}

	defer f.Close()

	if err = png.Encode(f, newImage); err != nil {
		return err
	}

	return nil
}

func genImage(width, height int, seededRand *rand.Rand) image.Image {
	dc := gg.NewContext(width, height)

	color1 := randomColor(seededRand)
	color2 := randomColor(seededRand)

	for x := 0; x < width; x++ {
		for y := 0; y < height; y++ {
			var color Color

			if seededRand.Intn(100) > 50 {
				color = color1
			} else {
				color = color2
			}

			dc.SetRGB(
				float64(
					color.r,
				)/colorMaxValue,
				float64(
					color.g,
				)/colorMaxValue,
				float64(
					color.b,
				)/colorMaxValue,
			)
			dc.SetPixel(x, y)
		}
	}

	return dc.Image()
}

func randomColor(randSource *rand.Rand) Color {
	return Color{
		r: uint8(randSource.Intn(colorMaxValue)),
		g: uint8(randSource.Intn(colorMaxValue)),
		b: uint8(randSource.Intn(colorMaxValue)),
	}
}

func hashSeed(seed string) (hash int64) {
	for _, char := range seed {
		hash = hash*31 + int64(char)
	}

	return
}

func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
